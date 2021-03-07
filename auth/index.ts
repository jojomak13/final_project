import mongoose from 'mongoose';
import { app } from './src/app';
import { env } from './src/helpers/config';
import { Country } from './src/models/Country';
import { Gender } from './src/models/enums/gender';
import { Patient } from './src/models/Patient';

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

  const p = await Patient.findOne({}).populate('Country');

  console.log(p);
  console.log(p!.populated('Country'));

  // const c = Country.build({
  //   name: 'egypt',
  //   timezone: 'klf/dsf',
  //   currency: 'egp',
  //   code: '3434',
  // });
  // await c.save();

  // const p = Patient.build({
  //   name: 'test',
  //   email: 'test@tes.com',
  //   phone: '3423243234',
  //   country: c,
  //   date_of_birth: new Date(),
  //   gender: Gender.MALE,
  //   password: '33242343',
  // });
  // await p.save();

  const port = env('PORT', 8080);
  app.listen(port, () => {
    console.log(`[Auth] service running on port ${port}`);
  });
};

setup();
