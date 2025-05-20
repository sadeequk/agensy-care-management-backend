// const AWS = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");

// // Configure AWS
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
//   region: process.env.AWS_REGION,
// });

// const s3 = new AWS.S3();

// // Multer S3 upload middleware
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_S3_BUCKET,
//     acl: "private",
//     key: function (req, file, cb) {
//       const fileName = `${Date.now()}-${file.originalname}`;
//       cb(null, fileName);
//     },
//   }),
// });

// // Delete file from S3
// const deleteFromS3 = (key) => {
//   return new Promise((resolve, reject) => {
//     s3.deleteObject(
//       {
//         Bucket: process.env.AWS_S3_BUCKET,
//         Key: key,
//       },
//       (err, data) => {
//         if (err) reject(err);
//         else resolve(data);
//       }
//     );
//   });
// };

// module.exports = {
//   upload,
//   deleteFromS3,
// };
