import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { router } from './routes';

const app: Express = express();

// define main middlewares
app.use(express.json());
app.set('trust proxy', true);

// load routes
app.use(router);

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  res.status(400).send(err.serialize());
});

export { app };
