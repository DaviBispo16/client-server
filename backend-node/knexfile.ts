import { Knex } from "knex";
import path from "path";
import ts from "typescript";

const config : {[key: string] : Knex.Config} = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, "src", "database", "dev.sqlite3")
        },
        migrations: {
            directory: path.resolve(__dirname, "src", "database", "migrations"),
            extension: 'ts'
        },
        useNullAsDefault: true
    }
};

export default config;