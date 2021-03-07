const express = require('express');
const cors = require('cors');
const bunyan = require('bunyan');
const getRouter = require('./routes/index.js');

const corsOptions = {
  origin: 'http://localhost:8080',
};

const app = express();
const logger = bunyan.createLogger({ name: 'aws-lambda-express' });
const logMiddleware = (req, res, next) => {
  logger.info({
    path: req.path, method: req.method, ip: req.ip, originalUrl: req.originalUrl,
  });
  next();
};
app.use(logMiddleware);

const defaultRouter = express.Router();
const router = getRouter(defaultRouter, cors(corsOptions));
app.use('/', router);

module.exports = app;
