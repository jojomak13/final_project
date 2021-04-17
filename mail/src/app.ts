import express, { Express } from 'express';
import 'express-async-errors';
import { currentUser, errorHandler, NotFoundError } from '@hti/common';
// import { mail } from './Mailer';

const app: Express = express();

// define main middlewares
app.set('trust proxy', true);
app.use(express.json());
app.use(currentUser);

//  NotFound Handler
app.use(() => {
  throw new NotFoundError();
});

// mail.connect({
//   user: '03b881ad9f83a1',
//   pass: '5964e160860839',
// });

// mail.sendTo('jojomak350@gmail.com', {
//   subject: 'shit',
//   body: 'shit  shit',
// });

// Error Handler
app.use(errorHandler);

export { app };
