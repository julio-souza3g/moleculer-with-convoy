import 'dotenv/config';
import { Context, ServiceSchema } from 'moleculer';
import redisService from '@lib/redis';
import convoy from './lib/convoy';

import Events from './types/events';

const WebhookService: ServiceSchema = {
  name: 'webhook',

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

        try {
          const response = await this.sendEvent(payload.data, payload.event_type);
          console.log('Event sent to Convoy.', response); // eslint-disable-line no-console
          return {
            message: 'Event sent to Convoy :)',
          };
        } catch (error) {
          console.error('Failed to send event to Convoy:', error); // eslint-disable-line no-console
          console.log('Persisting data on redis for retry...'); // eslint-disable-line no-console
          await this.persistDataOnRedis(`${payload.event_type}-${Date.now()}`, payload);
          return {
            message: 'Failed to send event to Convoy :( Persisting data on redis for retry...',
          };
        }
      },
    },
  },

  /**
   * Methods
   */
  methods: {
    async sendEvent(data: any, eventType: Events) {
      const eventData = {
        event_type: eventType,
        endpoint_id: process.env.WEBHOOK_ENDPOINT_ID,
        data,
      };

      const response = await convoy.post(`${process.env.CONVOY_PROJECT_ID}/events`, eventData);
      return response;
    },

    async persistDataOnRedis(key: string, data: any) {
      await redisService.addToRedis(key, data);
    },
  },
};

export default WebhookService;
