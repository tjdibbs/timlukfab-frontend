import fs from "fs";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const user = process.env.DATABASE_USER;
const database = process.env.DATABASE;
const password = process.env.DATABASE_PASSWORD;

const Pool = mysql.createPool({
  user,
  host: "localhost",
  database,
  password,
  waitForConnections: true,
  connectionLimit: 10,
  multipleStatements: true,
});

export default Pool;
