const jwt = require('jsonwebtoken');

const AuthError = require('../errors/authError');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return next(new AuthError('Необходима авторизация'));
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
