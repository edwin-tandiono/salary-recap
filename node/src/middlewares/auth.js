const jwt = require('jsonwebtoken');

const { SIGN_IN_PATH } = require('../constants/auth');

module.exports = (req, res, next) => {
  if (req.path === SIGN_IN_PATH) {
    return next();
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, userPayload) => {
    if (err) {
      return res.status(403).send();
    }

    req.user = userPayload;

    next();
  })
};
