const { Textract } = require('@aws-sdk/client-textract');
const { ALLOWED_FILE_TYPES } = require('../constants');
const multer = require('multer');

const textract = new Textract({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  },
});

const maxFileSize = 20 * 1024 * 1024; 

module.exports.upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxFileSize },
  fileFilter: (req, file, cb) => {
    Object.keys(ALLOWED_FILE_TYPES).includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type. Only PDF, JPEG, PNG files are allowed.'), false);
  },
}).single('document');

module.exports.scanDocument = async function scanDocument(documentBuffer) {
  try {
    if (documentBuffer.length > maxFileSize) {
      throw new Error('File too large');
    }

    const result = await textract.analyzeDocument({
      Document: { Bytes: documentBuffer },
      FeatureTypes: ['FORMS']
    });

    const text = result.Blocks?.filter(b => b.BlockType === 'LINE').map(b => b.Text).join(' ') || '';
    const keyValuePairs = {};

    result.Blocks?.forEach(block => {
      if (block.BlockType === 'KEY_VALUE_SET' && block.EntityTypes?.includes('KEY')) {
        const valueBlock = result.Blocks.find(b => 
          b.BlockType === 'KEY_VALUE_SET' && 
          !b.EntityTypes?.includes('KEY') &&
          b.Id === block.Relationships?.[0]?.Ids?.[0]
        );
        if (valueBlock) {
          const key = getTextFromBlock(block, result.Blocks);
          const value = getTextFromBlock(valueBlock, result.Blocks);
          if (key && value) keyValuePairs[key] = value;
        }
      }
    });

    return { success: true, text, keyValuePairs };
  } catch (error) {
    console.error('Textract error:', error.message);
    throw error;
  }
}

function getTextFromBlock(block, blocks) {
  return block.Relationships?.reduce((text, rel) => {
    if (rel.Type === 'VALUE') {
      rel.Ids.forEach(id => {
        const wordBlock = blocks.find(b => b.Id === id && b.BlockType === 'WORD');
        if (wordBlock) text += wordBlock.Text + ' ';
      });
    }
    return text;
  }, '') || '';
} 