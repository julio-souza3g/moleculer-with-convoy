import { ServiceSchema } from 'moleculer';
import ApiGateway from 'moleculer-web';

import cookieParser from 'cookie-parser';
import routes from './routes';

const GatewayService: ServiceSchema = {
  name: 'gateway',
  mixins: [ApiGateway],

  settings: {
    port: process.env.PORT || 4000,
    routes,
    cors: true,
    use: [
      cookieParser(),
    ],
  },

  actions: {
    ping: {
      auth: false,
      async handler() {
        return 'pong';
      },
    },
  },

  methods: {},
};

export default GatewayService;
