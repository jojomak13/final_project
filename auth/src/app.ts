import express from 'express';
import { Patient } from './models/Patient';

const app = express();

app.get('/', async (req, res) => {
  const p = await Patient.find({}).populate('country');

  res.json(p);
});

export { app };
