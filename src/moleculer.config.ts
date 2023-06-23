import { BrokerOptions } from 'moleculer';

import commonOptions from './moleculer.config.common';

const config = async () => {
  const options: BrokerOptions = {
    ...commonOptions,

    namespace: 'moleculer-demo',

    logger: true,
    logLevel: 'info',

    transporter: process.env.TRANSPORTER_URL || 'redis://localhost:6379',

    cacher: {
      type: 'Redis',
      options: {
        redis: process.env.TRANSPORTER_URL || 'redis://localhost:6379',
        maxParamsLength: 60,
      },
    },

    metrics: false,

    tracing: {
      enabled: false,
    },

    tracking: {
      enabled: true,
      shutdownTimeout: 60 * 1000,
    },

    hotReload: false,
  };
  return options;
};

export default config;
