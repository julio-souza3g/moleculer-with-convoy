import { resolve } from 'path';

export default {
  client: 'mysql2',
  useNullAsDefault: true,
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3307,
    database: 'application',
  },
  migrations: {
    directory: resolve(__dirname, '..', '..', 'migrations'),
  },
  pool: {
    min: 1,
    max: 100,
    // this will close idle connections after 1 seconds
    idleTimeoutMillis: 1 * 1000,
  },
};
