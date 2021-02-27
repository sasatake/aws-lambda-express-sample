import express from 'express';
import cors from 'cors';
import bunyan from 'bunyan';
import getRouter from './routes/index.js';

const corsOptions = {
  origin: 'http://localhost:8080',
};
const port = 3000;

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

app.listen(port, () => {
  logger.info(`app listening at http://localhost:${port}`);
});
