import { Factory } from '@hti/common';
import { Gender } from '../../models/enums/gender';
import { Patient } from '../../models/Patient';

const patientFactory = Factory.define(Patient, (faker: Faker.FakerStatic) => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    gender: faker.random.arrayElement(Object.values(Gender)),
    date_of_birth: faker.date.past(),
    password: '123456',
    country: '606331a7c0716d00457c9712',
  };
});

export { patientFactory };
