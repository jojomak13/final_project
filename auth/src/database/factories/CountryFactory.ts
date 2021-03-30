import { Factory } from '@hti/common';
import { Country } from '../../models/Country';

const countryFactory = Factory.define(Country, (faker: Faker.FakerStatic) => {
  return {
    name: faker.address.country(),
    code: faker.address.countryCode(),
    currency: faker.finance.currencyCode(),
    timezone: faker.address.timeZone(),
  };
});

export { countryFactory };
