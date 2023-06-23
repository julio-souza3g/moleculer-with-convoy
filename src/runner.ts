import { ServiceBroker, ServiceSchema } from 'moleculer';

import moleculerConfig from './moleculer.config';

class Runner {
  broker: ServiceBroker | undefined;

  service: ServiceSchema;

  constructor(service: ServiceSchema) {
    this.service = service;
  }

  async start() {
    const config = await moleculerConfig();

    this.broker = new ServiceBroker(config);
    this.broker.createService(this.service);
    this.broker.start();
  }
}

export default Runner;
