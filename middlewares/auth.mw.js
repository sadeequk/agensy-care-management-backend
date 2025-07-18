const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const userService = require("../services/user.service");
const client = jwksClient({
  jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.USER_POOL_ID}/.well-known/jwks.json`,
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

  jwt.verify(token, getKey, {}, async (err, decoded) => {
    if (err) return res.fail("Invalid token");
    // req.user = decoded;
    // console.log(decoded);
    const user = await userService.getUserByCognitoId(decoded.username);
    if (user) {
      req.user = user;
    } else {
      return res.fail("User Not found");
    }
    next();
  });
};
