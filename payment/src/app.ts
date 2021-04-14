import express, { Express } from 'express';
import 'express-async-errors';
import { currentUser, errorHandler, NotFoundError } from '@hti/common';
import { router } from './routes';

const app: Express = express();

// define main middlewares
app.set('trust proxy', true);
app.use(express.json());
app.use(currentUser);

// load routes
app.use('/api', router);

//  NotFound Handler
app.use(() => {
  throw new NotFoundError();
});

// Error Handler
app.use(errorHandler);

export { app };
