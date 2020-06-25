const Article = require('../models/article');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(201).send({ data: article.omitPrivate() }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .populate('owner')
    .orFail(() => new NotFoundError('Нет статьи с таким id'))
    .then((article) => {
      if (article.owner.id === req.user._id) {
        Article.deleteOne(article).then(() => res.send({ data: article }));
      } else {
        throw new ForbiddenError('Нельзя удалить статью, сохранённую другим пользователем');
      }
    })
    .catch(next);
};
