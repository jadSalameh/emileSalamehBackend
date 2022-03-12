export default {
  development: {
    client: "postgresql",
    connection: {
      database: "dbName",
      user: "dbUser",
      password: "pass123123",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
