const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const { User } = require("../models");

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

module.exports.authenticateSocket = async (socket, next) => {
  try {
    const token = socket.handshake.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      console.log("WebSocket Authentication failed: No token provided");
      return next(new Error("Unauthorized"));
    }

    jwt.verify(token, getKey, {}, async (err, decoded) => {
      if (err) {
        console.log("WebSocket Authentication failed: Invalid token");
        return next(new Error("Unauthorized"));
      }

      const user = await User.findOne({ where: { cognito_id: decoded.username } });

      if (!user) {
        console.log("WebSocket Authentication failed: User not found");
        return next(new Error("Unauthorized"));
      }

      console.log(`WebSocket Authenticated: ${user.email}`);
      socket.user = user;
      next();
    });
  } catch (error) {
    console.log("WebSocket Authentication failed:", error.message);
    return next(new Error("Unauthorized"));
  }
};
