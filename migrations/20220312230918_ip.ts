import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("Ips", (table) => {
    table.uuid("id").primary();
    table.string("ip").unique().index();
    table.integer("count");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("Ips");
}
