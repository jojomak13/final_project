import express, { Express } from 'express';
import 'express-async-errors';
import { errorHandler, NotFoundError } from '@hti/common';
import { router } from './routes';

const app: Express = express();

// define main middlewares
app.use(express.json());
app.set('trust proxy', true);

// load routes
app.use(router);

//  NotFound Handler
app.use(() => {
  throw new NotFoundError();
});

// Error Handler
app.use(errorHandler);

export { app };
