const routSignUp = require('express').Router();

const { validationForCreateUser } = require('../middlewares/validationForUsers');
const { createUser } = require('../controllers/users');

routSignUp.post('/', validationForCreateUser, createUser);

module.exports = routSignUp;
