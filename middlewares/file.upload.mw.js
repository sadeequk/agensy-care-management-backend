const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path = require("path");

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Configure multer for S3 upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `documents/${req.params.clientId}/${uniqueSuffix}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Add file type restrictions if needed
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

// Middleware to handle file upload
exports.uploadFile = upload.single("file");

// Middleware to handle file deletion
exports.deleteFile = async (req, res, next) => {
  try {
    if (req.body.s3_key) {
      await s3
        .deleteObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: req.body.s3_key,
        })
        .promise();
    }
    next();
  } catch (error) {
    console.error("File deletion error:", error);
    return res.serverError(error);
  }
};

// Middleware to generate signed URL
exports.generateSignedUrl = async (req, res, next) => {
  try {
    if (req.body.s3_key) {
      const signedUrl = await s3.getSignedUrlPromise("getObject", {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: req.body.s3_key,
        Expires: 3600, // URL expires in 1 hour
      });
      req.body.file_url = signedUrl;
    }
    next();
  } catch (error) {
    console.error("Signed URL generation error:", error);
    return res.serverError(error);
  }
};
