require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { isCelebrate } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});
const {
  PORT, DATABASE_URL,
} = require('./config');

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

app.use((err, req, res, next) => {
  const statusCode = isCelebrate(err) ? 400 : err.statusCode;
  res.status(statusCode || 500).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : err.message });
  return next();
});

app.listen(PORT);
