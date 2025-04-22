import { Sequelize } from "sequelize";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false, // Set to true if you want to debug SQL
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "production"
        ? { require: true, rejectUnauthorized: false }
        : undefined,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

export default sequelize;
