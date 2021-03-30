import mongoose from 'mongoose';
import { app } from './src/app';

const setup = async () => {
  const envKey = ['PORT', 'APP_KEY', 'DB_URI', 'TOKEN_EXPIRE_PERIOD'];

  try {
    envKey.forEach((key) => {
      if (!process.env[key]) {
        throw new Error(`[${key}] not found`);
      }
    });

    await mongoose.connect(process.env.DB_URI!, {
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('DB Connection Success');

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`[Timeslot] service running on port ${port}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

setup();
