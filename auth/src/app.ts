import express, { Express } from 'express';
import 'express-async-errors';
import { currentUser, errorHandler, NotFoundError } from '@hti/common';
import { router } from './routes';
import { patientFactory } from './database/factories/PatientFactory';
import { countryFactory } from './database/factories/CountryFactory';

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

// Factories
// countryFactory.create(15);
// patientFactory.create(20);

// Error Handler
app.use(errorHandler);

export { app };
