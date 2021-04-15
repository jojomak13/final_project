import express, { Express } from 'express';
import 'express-async-errors';
import { currentUser, errorHandler, NotFoundError } from '@hti/common';
import { MessageClient } from "cloudmailin"

const app: Express = express();

// define main middlewares
app.set('trust proxy', true);
app.use(express.json());
app.use(currentUser);

//  NotFound Handler
app.use(() => {
  throw new NotFoundError();
});


const client = new MessageClient({ username: '2a506dea731b2f94', apiKey: '7qHELamP4oyk9LaFnb3aJGGW'});

client.sendMessage({
  to: 'youssefwilliam970@gmail.com',
  from: 'project@test.test',
//   plain: 'test message',
  html:  '<h1>Test Message</h1>',
  subject: "hello world"
});

// Error Handler
app.use(errorHandler);

export { app };
