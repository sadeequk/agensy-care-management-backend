const { Textract } = require("@aws-sdk/client-textract");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const sharp = require("sharp");
const convert = require("heic-convert");

const textract = new Textract({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  },
});

exports.upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'image/heic'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, PNG, JPG, and HEIC files are allowed.'), false);
    }
  },
}).single("document");




// Entry point
exports.scanDocument = async (buffer, mimeType) => {
  if (mimeType === "application/pdf") {
    return await processPdfDocument(buffer);
  }
  return await processImageDocument(buffer, mimeType);
};

// PDF processing
async function processPdfDocument(pdfBuffer) {
  try {
    console.log('Trying AWS Textract (FORMS + TABLES) for PDF...');
    const result = await textract.analyzeDocument({
      Document: { Bytes: pdfBuffer },
      FeatureTypes: ["FORMS", "TABLES"],
    });
    return processTextract(result.Blocks);
  } catch (textractError) {
    console.error("Textract PDF failed:", textractError.message);
    try {
      console.log("Trying fallback: Textract FORMS only...");
      const fallbackResult = await textract.analyzeDocument({
        Document: { Bytes: pdfBuffer },
        FeatureTypes: ["FORMS"],
      });
      return processTextract(fallbackResult.Blocks);
    } catch (fallbackError) {
      console.error("Textract fallback also failed:", fallbackError.message);
    }

    try {
      console.log("Trying final fallback: PDF text extraction...");
      const pdfData = await pdfParse(pdfBuffer);
      const extractedText = pdfData.text || '';
      const keyValuePairs = parseTextForKeyValuePairs(extractedText);
      return {
        keyValuePairs,
        text: extractedText
      };
    } catch (parseError) {
      console.error("PDF text parsing failed:", parseError.message);
      throw new Error("PDF processing failed. Please convert to an image (JPEG/PNG) and try again.");
    }
  }
}

// Image processing
async function processImageDocument(imageBuffer, mimeType) {
  try {
    let processedBuffer = imageBuffer;

    if (mimeType === "image/heic") {
      try {
        console.log("Converting HEIC to JPEG...");
        processedBuffer = await convert({
          buffer: imageBuffer,
          format: "JPEG",
          quality: 1,
        });
        console.log("HEIC to JPEG conversion done.");
      } catch (heicErr) {
        console.error("HEIC conversion failed:", heicErr.message);
        throw new Error("HEIC image could not be converted. Please upload JPEG/PNG instead.");
      }
    }

    const result = await textract.analyzeDocument({
      Document: { Bytes: processedBuffer },
      FeatureTypes: ["FORMS", "TABLES"],
    });

    return processTextract(result.Blocks);
  } catch (error) {
    console.error("Textract image failed:", error.message);
    throw error;
  }
}

// Extract key-value pairs from Textract blocks
function processTextract(blocks = []) {
  const blockMap = {};
  blocks.forEach(block => (blockMap[block.Id] = block));

  const keyValuePairs = {};
  const keyBlocks = blocks.filter(
    b => b.BlockType === "KEY_VALUE_SET" && b.EntityTypes?.includes("KEY")
  );

  keyBlocks.forEach(keyBlock => {
    const key = getText(keyBlock, blockMap);
    const valRel = keyBlock.Relationships?.find(r => r.Type === "VALUE");
    let value = "";

    if (valRel?.Ids?.length) {
      const valueBlock = blockMap[valRel.Ids[0]];
      value = getText(valueBlock, blockMap);
    }

    if (key && value) {
      keyValuePairs[key.trim()] = value.trim();
    }
  });

  const fullText = blocks
    .filter(b => b.BlockType === "LINE")
    .map(b => b.Text)
    .join(" ");

  return { keyValuePairs, text: fullText };
}

// Helper: extract text from Textract block
function getText(block, blockMap) {
  let text = "";
  block.Relationships?.forEach(r => {
    if (r.Type === "CHILD") {
      r.Ids.forEach(id => {
        const word = blockMap[id];
        if (word?.BlockType === "WORD") {
          text += word.Text + " ";
        }
      });
    }
  });
  return text.trim();
}

// Fallback text parser
function parseTextForKeyValuePairs(text) {
  const keyValuePairs = {};
  const lines = text.split('\n');
  for (let line of lines) {
    const trimmed = line.trim();
    if (trimmed.includes(":")) {
      const [key, value] = trimmed.split(":").map(s => s.trim());
      if (key && value) keyValuePairs[key] = value;
    }
  }
  return keyValuePairs;
}
