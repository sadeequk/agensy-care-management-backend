const awsTextract = require('../helpers/aws.textract');

exports.scanDocument = async (buffer, mimetype) => {
  return awsTextract.scanDocument(buffer, mimetype);
};
