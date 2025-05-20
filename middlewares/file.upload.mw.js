const multer = require("multer");
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { Document } = require("../models");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, JPEG, PNG, and Word documents are allowed."));
    }
  },
});

exports.uploadFile = [
  upload.single("file"),
  async (req, res, next) => {
    if (!req.file) return next();

    try {
      const originalName = req.file.originalname.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${originalName}`;

      const putCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      });

      await s3.send(putCommand);

      req.body.file_url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
      next();
    } catch (error) {
      console.error("S3 upload error:", error);
      return res.serverError(error);
    }
  },
];

exports.deleteFile = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    console.log("Attempting to delete document with ID:", documentId);

    const document = await Document.findByPk(documentId);
    console.log("Found document:", document ? "Yes" : "No");

    if (!document) {
      console.log("Document not found, skipping S3 deletion");
      return res.fail("Document not found");
    }

    if (document.file_url) {
      console.log("Document has file_url:", document.file_url);
      try {
        // Extract the key from the file_url
        const fileUrl = document.file_url;
        const key = fileUrl.split(".com/")[1];
        console.log("Attempting to delete S3 file with key:", key);

        const deleteCommand = new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key,
        });

        await s3.send(deleteCommand);
        console.log("Successfully deleted file from S3:", key);
      } catch (s3Error) {
        console.error("Error deleting file from S3:", s3Error);
        console.error("S3 Error details:", {
          message: s3Error.message,
          code: s3Error.code,
          requestId: s3Error.$metadata?.requestId,
        });
      }
    } else {
      console.log("Document has no file_url, skipping S3 deletion");
    }
    next();
  } catch (error) {
    console.error("File deletion middleware error:", error);
    return res.serverError(error);
  }
};

exports.generateSignedUrl = (req, res, next) => next();
