import { BaseModel } from './config/BaseModel';
import { ModelObject } from './config/BaseModelObject';

export class User extends BaseModel {
  public static tableName = 'USERS';

  public id: number;

  public name!: string;

  public email!: string;

  public password!: string;
}

export type IUser = ModelObject<User> | undefined;
