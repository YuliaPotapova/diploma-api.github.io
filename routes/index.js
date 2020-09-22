const routes = require('express').Router();
const routSignUp = require('./signup');
const routSignIn = require('./signin');
const routSignOut = require('./signout');
const routUsers = require('./users');
const routArticles = require('./articles');
const NotFoundError = require('../errors/notFoundError');

routes.use('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
routes.use('/signup', routSignUp);
routes.use('/signin', routSignIn);
routes.use('/signout', routSignOut);
routes.use('/users', routUsers);
routes.use('/articles', routArticles);
routes.use((req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

module.exports = routes;
