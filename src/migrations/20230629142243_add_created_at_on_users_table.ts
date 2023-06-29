import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('USERS', (table) => {
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('USERS', (table) => {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
  });
}
