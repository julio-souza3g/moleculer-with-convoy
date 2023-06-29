import 'dotenv/config';
import axios from 'axios';
import { Context, ServiceSchema, Errors } from 'moleculer';

const WebhookService: ServiceSchema = {
  name: 'webhook',

  /**
   * Moleculer Channels use rabbitmq adapter and queues are automatically created by it
   * @see https://github.com/moleculerjs/moleculer-channels
   */

  channels: {
    'process.event': async function processEvent(payload:any) {
      await this.sendEventToCustomer(payload);
    },
  },

  /**
   * Actions
   */
  actions: {
    hello: {
      async handler(ctx: Context) { // eslint-disable-line @typescript-eslint/no-unused-vars
        return 'Hello Webhook Moleculer';
      },
    },

    send: {
      async handler(ctx: Context) {
        const payload = ctx.params as any;
        await this.sendEventToCustomer(payload);
        return 'Event sent to customer';
      },
    },
  },

  /**
   * Methods
   */
  methods: {
    async sendEventToCustomer(payload: any) {
      try {
        await axios.post(`${process.env.WEBHOOK_URL}`, payload);
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
        throw new Errors.MoleculerError('Error sending event to customer', 500);
      }
    },
  },
};

export default WebhookService;
