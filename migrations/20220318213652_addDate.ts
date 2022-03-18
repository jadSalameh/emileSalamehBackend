import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("Ips", (table) => {
    table.dateTime("lastVisit");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("Ips", (table) => {
    table.dropColumn("lastVisit");
  });
}
