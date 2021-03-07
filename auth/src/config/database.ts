import { env } from '../helpers/config';

export default {
  mongo: {
    uri: env('DB_URI'),
    username: env('DB_USER', 'root'),
    password: env('DB_PASS', ''),
  },
};
