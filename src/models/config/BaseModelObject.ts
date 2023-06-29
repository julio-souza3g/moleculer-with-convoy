import { NonFunctionPropertyNames } from 'objection';

const BaseModel = require('./BaseModel');

export type ModelObject<T extends typeof BaseModel> = {
  [K in Exclude<NonFunctionPropertyNames<T>, 'QueryBuilderType'>]: T[K];
};
