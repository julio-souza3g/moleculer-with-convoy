import 'dotenv/config';
import { Middleware, ServiceBroker, ServiceSchema } from 'moleculer';

import moleculerConfig from './moleculer.config';

const ChannelsMiddleware = require('@moleculer/channels').Middleware;

const amqpURL = process.env.AMQP_URL || 'amqp://localhost';

type RunnerOptions = {
  disableChannelsMiddleware?: boolean;
};

class Runner {
  broker: ServiceBroker | undefined;

  service: ServiceSchema;

  middlewares: Array<Middleware>;

  constructor(service: ServiceSchema, opts?: RunnerOptions) {
    this.service = service;
    this.middlewares = [];

    if (!opts?.disableChannelsMiddleware) {
      this.middlewares.push(ChannelsMiddleware({
        adapter: {
          type: 'AMQP',
          options: {
            amqp: { url: amqpURL },
            deadLettering: { enabled: false },
          },
        },
      }));
    }
  }

  async start() {
    const config = await moleculerConfig();

    this.broker = new ServiceBroker({
      ...config,
      middlewares: this.middlewares,
    });
    this.broker.createService(this.service);
    this.broker.start();
  }
}

export { Runner, RunnerOptions };
