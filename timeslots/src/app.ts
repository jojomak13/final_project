import express, { Express } from 'express';
import 'express-async-errors';
import { currentUser, errorHandler, NotFoundError } from '@hti/common';
import { router } from './routes';
import dotenv from 'dotenv';

// TODO remove [dotenv] while create docker setup
dotenv.config();

const app: Express = express();

// define main middlewares
app.set('trust proxy', true);
app.use(express.json());
app.use(currentUser);

// load routes
app.use(router);

//  NotFound Handler
app.use(() => {
  throw new NotFoundError();
});

// Error Handler
app.use(errorHandler);

export { app };
