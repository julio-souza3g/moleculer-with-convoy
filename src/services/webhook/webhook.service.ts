import { Context, ServiceSchema } from 'moleculer';

const WebhookService: ServiceSchema = {
  name: 'webhook',

  /**
   * Actions
   */
  actions: {
    hello: {
      async handler(ctx: Context) { // eslint-disable-line @typescript-eslint/no-unused-vars
        return 'Hello Moleculer';
      },
    },
  },

  /**
   * Methods
   */
  methods: {},
};

export default WebhookService;
