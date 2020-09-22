const routSignIn = require('express').Router();

const { validationForLogin } = require('../middlewares/validationForUsers');
const { login } = require('../controllers/users');

routSignIn.post('/', validationForLogin, login);

module.exports = routSignIn;
