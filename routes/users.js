const routUsers = require('express').Router();

const { getUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

routUsers.get('/me', auth, getUser);

module.exports = routUsers;
