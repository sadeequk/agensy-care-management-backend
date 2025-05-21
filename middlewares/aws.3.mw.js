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
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", //docx
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
      // req.body.file_url = req.file.location;
      next();
    } catch (error) {
      console.error("S3 upload error:", error);
      return res.serverError(error);
    }
  },
];

exports.updateFile = [
  upload.single("file"),
  async (req, res, next) => {
    if (!req.file) return next();

    try {
      const document = await Document.findByPk(req.params.documentId);
      if (!document) {
        return res.fail("Document not found");
      }

      if (document.file_url) {
        const oldKey = document.file_url.split(".com/")[1];
        try {
          const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: oldKey,
          });
          await s3.send(deleteCommand);
          console.log("Successfully deleted old file from S3:", oldKey);
        } catch (s3Error) {
          console.error("Error deleting old file from S3:", s3Error);
          return res.serverError("Failed to delete old file from S3");
        }
      }

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
      req.body.file_size = req.file.size;
      req.body.file_type = req.file.mimetype;
      req.body.s3_bucket = process.env.AWS_S3_BUCKET;

      next();
    } catch (error) {
      console.error("S3 update error:", error);
      return res.serverError(error);
    }
  },
];

exports.deleteFile = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findByPk(documentId);

    if (!document) {
      return res.fail("Document not found");
    }

    if (document.file_url) {
      try {
        const fileUrl = document.file_url;
        const key = fileUrl.split(".com/")[1];
        console.log("Attempting to delete S3 file with key:", key);

        const deleteCommand = new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key,
        });

        await s3.send(deleteCommand);
      } catch (s3Error) {
        console.error("Error deleting file from S3:", s3Error);
        console.error("S3 Error details:", {
          message: s3Error.message,
          code: s3Error.code,
          requestId: s3Error.$metadata?.requestId,
        });
      }
    }
    next();
  } catch (error) {
    console.error("File deletion middleware error:", error);
    return res.serverError(error);
  }
};
