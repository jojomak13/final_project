import express, { Express } from 'express';
import { env } from './helpers/config';
import { router } from './routes';

const app: Express = express();

// load routes
app.use(router);

export { app };
