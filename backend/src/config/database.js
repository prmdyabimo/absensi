require("dotenv").config();

const { Pool } = require("pg");

const requiredEnvVariable = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_PORT",
];
requiredEnvVariable.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error("Environment variable " + envVar + " is missing");
  }
});

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const connect = async () => {
  try {
    await pool.connect();
    console.log("Connected to the database");
  } catch (err) {
    console.log("Failed to connect to the database, error: ", err);
    process.exit(1);
  }
};

module.exports = {
  pool,
  connect,
  query: (text, params) => pool.query(text, params),
};
