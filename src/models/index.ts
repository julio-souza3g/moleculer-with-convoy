import { knex } from 'knex';
import knexconfig from './config/knexconfig';

// import models
import { User as UserModel } from './User';

// export model interfaces
export { IUser } from './User';

//  establish connection to database
const connection = knex(knexconfig);

// bind all models to the database connection
UserModel.knex(connection);

// export all models
export const User = UserModel;

// export connection
export const db = connection;
