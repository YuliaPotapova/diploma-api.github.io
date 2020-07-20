const routSignOut = require('express').Router();

const { logout } = require('../controllers/users');
const auth = require('../middlewares/auth');

routSignOut.post('/', auth, logout);

module.exports = routSignOut;
