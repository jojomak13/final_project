import express, { Express } from 'express';
import { apolloServer } from './graphql';
import { env } from './helpers/config';

const app: Express = express();

app.get('/', async (_req, res) => {
  res.json({ name: 'Auth Service', port: env('PORT', 8080) });
});

// load Apolo GraphQl
apolloServer.applyMiddleware({ app, path: '/graphql' });

export { app };
