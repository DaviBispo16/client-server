import { Knex } from "knex";
import {v4 as uuidv4} from "uuid";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table) => {
        table.uuid("id").primary();
        table.string("username", 30).notNullable().unique();
        table.string("email", 254).notNullable().unique();
        table.string("password", 72).notNullable();
        table.timestamps(true, true);
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}