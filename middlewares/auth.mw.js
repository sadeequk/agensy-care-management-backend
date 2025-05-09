// const jwt = require('jsonwebtoken');
// const UserService = require('../services/user.service');

// module.exports.ensureAuthenticated = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) return res.fail('Unauthorized');

//   try {
//     const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

//     const user = await UserService.readById(decoded.id);

//     if (!user) return res.fail('Unauthorized');

//     req.user = user;
//     return next();
//   } catch (err) {
//     console.log(err);
//     return res.fail('Unauthorized');
//   }
// };
// const jwt = require("jsonwebtoken");
// const jwksClient = require("jwks-rsa");

// // Replace with your Cognito user pool region and id
// const client = jwksClient({
//   jwksUri: "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_RXGHY5qLr/.well-known/jwks.json",
// });

// function getKey(header, callback) {
//   client.getSigningKey(header.kid, function (err, key) {
//     const signingKey = key.publicKey || key.rsaPublicKey;
//     callback(null, signingKey);
//   });
// }

// module.exports = function verifyCognitoToken(req, res, next) {
//   const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "No token provided" });

//   jwt.verify(token, getKey, {}, (err, decoded) => {
//     if (err) return res.status(401).json({ error: "Invalid token" });
//     req.user = decoded;
//     next();
//   });
// };

const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_RXGHY5qLr/.well-known/jwks.json",
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err || !key) {
      console.error("Could not get signing key for kid:", header.kid, err);
      return callback(new Error("Signing key not found"), null);
    }
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

module.exports = function verifyCognitoToken(req, res, next) {
  let token = req.headers.authorization;
  if (!token) return res.fail("No token provided");

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  jwt.verify(token, getKey, {}, (err, decoded) => {
    if (err) return res.fail("Invalid token");
    req.user = decoded;
    next();
  });
};
