export default {
  development: {
    client: "postgresql",
    connection: {
      database: "emilesalameh",
      user: "postgres",
      password: "123pass123",
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
