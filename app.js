require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./rateLimiter');
const {
  PORT, DATABASE_URL,
} = require('./config');
const errorsHandler = require('./errorsHandler');
const routes = require('./routes');

mongoose.set('useUnifiedTopology', true);
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();

app.use(helmet());
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use(errorsHandler);

app.listen(PORT);
