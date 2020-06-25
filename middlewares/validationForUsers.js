const { celebrate, Joi } = require('celebrate');

const InvalidReqError = require('../errors/invalidReqError');

const email = Joi.string().required().email()
  .error(() => new InvalidReqError('Некорректный адрес электронной почты'));
const password = Joi.string().required().min(8)
  .error(() => new InvalidReqError('Пароль обязателен и должен состоять не менее, чем из 8 символов'));
const name = Joi.string().trim().min(2).max(30)
  .required()
  .error(() => new InvalidReqError('Имя пользователя введено некорректно'));

module.exports.validationForCreateUser = celebrate({
  body: Joi.object().keys({
    email, password, name,
  }),
});

module.exports.validationForLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(() => new InvalidReqError('Неверный адрес электронной почты или пароль')),
    password: Joi.string().required().min(8)
      .error(() => new InvalidReqError('Неверный адрес электронной почты или пароль')),
  }),
});
