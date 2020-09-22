const { isCelebrate } = require('celebrate');

module.exports = (err, req, res, next) => {
  const statusCode = isCelebrate(err) ? 400 : err.statusCode;
  res.status(statusCode || 500).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : err.message });
  return next();
};
