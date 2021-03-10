import mongoose from 'mongoose';
import { app } from './src/app';
import { env } from './src/helpers/config';
import { Country } from './src/models/Country';

const setup = async () => {
  try {
    // @ts-ignore
    await mongoose.connect(env('DB_URI', 'mongodb://127.0.0.1:27017/auth'), {
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('DB Connection Success');
  } catch (err) {
    console.log('DB Connection Error');
  }

  const port = env('PORT', 8080);
  app.listen(port, () => {
    console.log(`[Auth] service running on port ${port}`);
  });
};

setup();
