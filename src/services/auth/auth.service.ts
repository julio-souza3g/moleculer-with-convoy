import 'dotenv/config';
import { Context, ServiceSchema, Errors } from 'moleculer';
import rabbitMQInstance from '@lib/rabbitmq';

import { db } from '@models/index';

const AuthService: ServiceSchema = {
  name: 'auth',

  /**
   * Actions
   */
  actions: {
    createUser: {
      async handler(ctx: Context) {
        const { name, email, password } = ctx.params as any;
        let transaction;

        // return error if params are missing
        if (!name || !email || !password) {
          throw new Errors.MoleculerClientError('Missing params', 400);
        }

        try {
          const { channel } = await rabbitMQInstance.connect();
          transaction = await db.transaction();

          // insert user
          const [insertedUserId] = await transaction('USERS').insert({
            name,
            email,
            password,
            created_at: new Date(),
            updated_at: new Date(),
          });

          // configs to publish message
          const queue = 'webhook.moleculer-demo.process.event';
          const message = {
            event_type: 'user.created',
            data: {
              id: insertedUserId,
              name,
              email,
              password,
            },
          };

          // publish message
          channel.publish('', queue, Buffer.from(JSON.stringify(message)), { mandatory: true });

          // function to wait for the message to be confirmed
          const waitForConfirmation = () => new Promise<void>((resolve, reject) => {
            channel.once('ack', () => {
              console.log('Event published to RabbitMQ'); // eslint-disable-line no-console
              resolve();
            });

            channel.once('return', (msg) => {
              console.error('Event not published to RabbitMQ:', msg.content.toString()); // eslint-disable-line no-console
              reject(new Error('Error publishing event to RabbitMQ'));
            });
          });

          // wait for the message to be confirmed
          await waitForConfirmation();

          // commit transaction
          await transaction.commit();

          return {
            message: 'User created',
          };
        } catch (error: any) {
          // rollback transaction
          if (transaction) await transaction.rollback();
          throw new Errors.MoleculerClientError(error.message, 400);
        }
      },
    },
  },

  /**
   * Methods
   */
  methods: {},
};

export default AuthService;
