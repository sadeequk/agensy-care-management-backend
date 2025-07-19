const awsTextract = require('../helpers/aws.textract');

module.exports.scanDocument = (documentBuffer) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await awsTextract.scanDocument(documentBuffer);
      resolve(result);
    } catch (error) {
      console.error('Document scanning service error:', error);
      reject(error);
    }
  });
};