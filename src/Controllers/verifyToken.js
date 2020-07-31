const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const { authorization } = req.headers;
  if (authorization) {
    try {
      const token = authorization.split(' ')[1]; // '<type> <token>'
      jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
    } catch (err) {
      return res.sendStatus(401);
    }
  } else {
    return res.sendStatus(403);
  }
  return next();
}

module.exports = verifyToken;
