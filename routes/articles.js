const routArticles = require('express').Router();

const {
  validationForCreateArticle, validationForArticleId,
} = require('../middlewares/validationForArticles');

const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

const auth = require('../middlewares/auth');

routArticles.get('/', auth, getArticles);
routArticles.post('/', auth, validationForCreateArticle, createArticle);
routArticles.delete('/:articleId', auth, validationForArticleId, deleteArticle);

module.exports = routArticles;
