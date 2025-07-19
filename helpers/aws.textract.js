// const { Textract } = require('@aws-sdk/client-textract');
// const { ALLOWED_FILE_TYPES } = require('../constants');

// const textract = new Textract({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
//   },
// });

// const DOCUMENT_CONFIG = {
//   maxFileSize: 20 * 1024 * 1024, // 20MB
//   allowedFileTypes: ALLOWED_FILE_TYPES  ,   
//   errorMessages: {
//     invalidFileType: `${ALLOWED_FILE_TYPES }`
//   }
// };

// module.exports.scanDocument = async function scanDocument(documentBuffer) {
//   try {
  
//     if (documentBuffer.length > DOCUMENT_CONFIG.maxFileSize) {
//       throw new Error(`File too large. Maximum size is ${DOCUMENT_CONFIG.maxFileSize / (1024 * 1024)}MB`);
//     }

//     // Call AWS Textract
//     const result = await textract.analyzeDocument({
//       Document: { Bytes: documentBuffer },
//       FeatureTypes: ['FORMS']
//     });

//     // Extract text and key-value pairs
//     const text = result.Blocks?.filter(b => b.BlockType === 'LINE').map(b => b.Text).join(' ') || '';
//     const keyValuePairs = {};

//     // Extract key-value pairs
//     if (result.Blocks) {
//       const keyMap = new Map();
//       const valueMap = new Map();
//       const blockMap = new Map();

//       result.Blocks.forEach(block => {
//         blockMap.set(block.Id, block);
//         if (block.BlockType === 'KEY_VALUE_SET') {
//           if (block.EntityTypes?.includes('KEY')) {
//             keyMap.set(block.Id, block);
//           } else {
//             valueMap.set(block.Id, block);
//           }
//         }
//       });

//       keyMap.forEach((keyBlock) => {
//         const valueBlock = valueMap.get(keyBlock.Relationships?.[0]?.Ids?.[0]);
//         if (valueBlock) {
//           const key = getTextFromBlock(keyBlock, blockMap);
//           const value = getTextFromBlock(valueBlock, blockMap);
//           if (key && value) {
//             keyValuePairs[key] = value;
//           }
//         }
//       });
//     }

//     return { success: true, text, keyValuePairs };

//   } catch (error) {
//     console.error('Textract error:', error.message);
    
//     if (error.name === 'InvalidParameterException') {
//       throw new Error(DOCUMENT_CONFIG.errorMessages.invalidFileType);
//     } else if (error.name === 'AccessDeniedException') {
//       throw new Error('AWS access denied. Check credentials');
//     }
    
//     throw error;
//   }
// }

// function getTextFromBlock(block, blockMap) {
//   let text = '';
//   if (block.Relationships) {
//     block.Relationships.forEach(rel => {
//       if (rel.Type === 'VALUE') {
//         rel.Ids.forEach(id => {
//           const wordBlock = blockMap.get(id);
//           if (wordBlock?.BlockType === 'WORD') {
//             text += wordBlock.Text + ' ';
//           }
//         });
//       }
//     });
//   }
//   return text.trim();
// }

// exports.scanDocument = scanDocument;
// exports.DOCUMENT_CONFIG = DOCUMENT_CONFIG; 