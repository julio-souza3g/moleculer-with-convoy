/* eslint-disable max-classes-per-file */
const { Model } = require('objection');

// Default options for singlestore models... this can be overridden by the model
export const BaseModelOptions = {
  createdAtColumnName: 'created_at',
  updatedAtColumnName: 'updated_at',
  createdAtColumn: true,
  updatedAtColumn: true,
};

export class BaseModel extends Model {
  static modelOptions = BaseModelOptions;

  private $modelOptions: any;

  constructor() {
    super();

    // Makes this available to the model instance methods
    this.$modelOptions = this.$modelClass.modelOptions;
  }

  static query(...args: any[]) {
    const queryBuild = super.query(...args);
    return queryBuild;
  }

  static queryDeleted(...args: any[]) {
    const queryBuild = super.query(...args);
    return queryBuild;
  }

  static knex(...args: any[]) {
    const knexBuild = super.knex(...args);
    return knexBuild;
  }

  $beforeUpdate() {
    if (this.$modelOptions.updatedAtColumn) {
      this[this.$modelOptions.updatedAtColumnName] = new Date();
    }
  }

  $beforeInsert() {
    if (this.$modelOptions.createdAtColumn) {
      this[this.$modelOptions.createdAtColumnName] = new Date();
    }
    if (this.$modelOptions.updatedAtColumn) {
      this[this.$modelOptions.updatedAtColumnName] = new Date();
    }
  }
}
