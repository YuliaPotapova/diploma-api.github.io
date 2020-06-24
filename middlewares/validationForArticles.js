const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const InvalidReqError = require('../errors/invalidReqError');

module.exports.validationForCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .error(() => new InvalidReqError('Некорректно переданы ключевые слова поиска')),
    title: Joi.string().required()
      .error(() => new InvalidReqError('Некорректно передан заголовок статьи')),
    text: Joi.string().required()
      .error(() => new InvalidReqError('Некорректно передан текст статьи')),
    date: Joi.string().required()
      .error(() => new InvalidReqError('Некорректно передана дата статьи')),
    source: Joi.string().required()
      .error(() => new InvalidReqError('Некорректно передан источник статьи')),
    link: Joi.string().required()
      .custom((value, helpers) => (validator.isURL(value) ? value : helpers.error()))
      .error(() => new InvalidReqError('Неверная ссылка на статью')),
    image: Joi.string().required()
      .custom((value, helpers) => (validator.isURL(value) ? value : helpers.error()))
      .error(() => new InvalidReqError('Неверная ссылка на иллюстрацию к статье')),
  }),
});

module.exports.validationForArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(24)
      .error(() => new InvalidReqError('Некорректный идентификатор статьи')),
  }),
});
