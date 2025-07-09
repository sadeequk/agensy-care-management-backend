const multer = require("multer");
const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { Document } = require("../models");
const { ALLOWED_FILE_TYPES, ALLOWED_AVATAR_TYPES } = require("../constants");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  },
});

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_FILE_TYPES[file.mimetype]) {
      cb(null, true);
    } else {
      const allowedTypes = Object.values(ALLOWED_FILE_TYPES).join(", ");
      cb(new Error(`Invalid file type. Allowed types are: ${allowedTypes}`));
    }
  },
});

function uploadFileWithErrorHandler(req, res, next) {
  upload.single("file")(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.fail("File size should not exceed 20MB");
      }
      return res.fail(err.message);
    }
    next();
  });
}

exports.uploadFile = [
  uploadFileWithErrorHandler,
  async (req, res, next) => {
    if (!req.file) return res.fail("Please upload a file");

    try {
      const originalName = req.file.originalname.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${originalName}`;

      const putCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ServerSideEncryption: "AES256",
        Metadata: {
          originalName: originalName,
          uploadedBy: req.user.id, //uploadedBy
          clientId: req.clientId,
        },
      });

      await s3.send(putCommand);

      const getCommand = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        ResponseContentDisposition: `attachment; filename="${originalName}"`,
        ResponseCacheControl: "no-cache, no-store, must-revalidate",
      });

      await getSignedUrl(s3, getCommand, {
        expiresIn: 300,
      });

      req.uploadedFile = {
        url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`,
        fileName: fileName,
        originalName: originalName,
        fileType: ALLOWED_FILE_TYPES[req.file.mimetype],
      };
      next();
    } catch (error) {
      console.error("S3 upload error:", error);
      return res.serverError("Failed to upload file. Please try again.");
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

    if (document.file_name) {
      try {
        const deleteCommand = new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: document.file_name,
        });

        await s3.send(deleteCommand);
      } catch (s3Error) {
        console.error("Error deleting file from S3:", s3Error);
      }
    }
    next();
  } catch (error) {
    console.error("File deletion middleware error:", error);
    return res.serverError("Failed to delete file. Please try again.");
  }
};

exports.generatePresignedUrl = async (fileName) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      ResponseContentDisposition: "inline",
      ResponseCacheControl: "no-cache, no-store, must-revalidate",
    });

    // Generate a pre-signed URL that expires in 5 minutes
    const presignedUrl = await getSignedUrl(s3, command, {
      expiresIn: 300, // 5 minutes
    });

    // console.log("Generated pre-signed URL for:", fileName);
    return presignedUrl;
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    throw error;
  }
};

// Avatar related functions
const avatar = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_AVATAR_TYPES[file.mimetype]) {
      cb(null, true);
    } else {
      const allowedTypes = Object.values(ALLOWED_AVATAR_TYPES).join(", ");
      cb(new Error(`Invalid file type. Allowed types are: ${allowedTypes}`));
    }
  },
});

function uploadAvatarWithErrorHandler(req, res, next) {
  avatar.single("file")(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.fail("Avatar size should not exceed 5MB");
      }
      return res.fail(err.message);
    }
    next();
  });
}

exports.uploadAvatar = [
  uploadAvatarWithErrorHandler,
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.fail("Please upload an avatar file");
      }

      const originalName = req.file.originalname.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
      const fileName = `avatars/${Date.now()}-${Math.round(Math.random() * 1e9)}-${originalName}`;

      const putCommand = new PutObjectCommand({
        Bucket: "agensy-staging-assets",
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        Metadata: {
          originalName: originalName,
          uploadedBy: req.user.id,
          fileType: ALLOWED_AVATAR_TYPES[req.file.mimetype],
        },
      });

      await s3.send(putCommand);

      req.uploadedAvatar = `https://agensy-staging-assets.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
      next();
    } catch (error) {
      console.error("S3 avatar upload error:", error);
      return res.serverError("Failed to upload avatar. Please try again.");
    }
  },
];

exports.deleteAvatar = async (key) => {
  try {
    if (!key) return;

    // Extract just the filename from the full URL
    const filename = key.split("/").pop();
    const avatarKey = `avatars/${filename}`;

    const deleteCommand = new DeleteObjectCommand({
      Bucket: "agensy-staging-assets",
      Key: avatarKey,
    });

    await s3.send(deleteCommand);
  } catch (error) {
    console.error("Error deleting avatar from S3:", error);
    throw error;
  }
};
