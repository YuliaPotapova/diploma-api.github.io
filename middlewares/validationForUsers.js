const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const InvalidReqError = require('../errors/invalidReqError');

const name = Joi.string().trim().min(2).max(30)
  .required()
  .error(() => new InvalidReqError('Имя пользователя введено некорректно'));
const about = Joi.string().required().min(2).max(30)
  .error(() => new InvalidReqError('Информация о пользователе введена некорректно'));
const avatar = Joi.string().required()
  .custom((value, helpers) => (validator.isURL(value) ? value : helpers.error()))
  .error(() => new InvalidReqError('Неверная ссылка на ресурс'));
const email = Joi.string().required().email()
  .error(() => new InvalidReqError('Некорректный адрес электронной почты'));
const password = Joi.string().required().min(8)
  .error(() => new InvalidReqError('Пароль обязателен и должен состоять не менее, чем из 8 символов'));

module.exports.validationForGetUser = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24)
      .error(() => new InvalidReqError('Некорректный идентификатор пользователя')),
  }),
});

module.exports.validationForCreateUser = celebrate({
  body: Joi.object().keys({
    name, about, avatar, email, password,
  }),
});

module.exports.validationForUpdateUser = celebrate({
  body: Joi.object().keys({
    name, about,
  }),
});

module.exports.validationForUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar,
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
