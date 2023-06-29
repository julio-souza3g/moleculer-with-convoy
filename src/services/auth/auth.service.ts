import 'dotenv/config';
import { Context, ServiceSchema, Errors } from 'moleculer';

import { User as UserModel, IUser } from '@models/index';

const AuthService: ServiceSchema = {
  name: 'auth',

  /**
   * Actions
   */
  actions: {
    createUser: {
      async handler(ctx: Context) {
        const { name, email, password } = ctx.params as any;

        // return error if params are missing
        if (!name || !email || !password) {
          throw new Errors.MoleculerClientError('Missing params', 400);
        }

        const user: IUser = await UserModel.query().insert({
          name,
          email,
          password,
        });

        return user;
      },
    },
  },

  /**
   * Methods
   */
  methods: {},
};

export default AuthService;
