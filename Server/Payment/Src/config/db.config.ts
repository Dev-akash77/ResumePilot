import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../database/schema";
import logger from "./logger.config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ! CREATE A DATABASE INSTANCE FOR DRIZZLE
export const database = drizzle(pool, { schema });

// ! DATA BASE CONNECTION
export const pg_onnection = async (): Promise<void> => {
  try {
    const client = await pool.connect();

    logger.info(`POSTGRE Connected`);
    client.release();
  } catch (error) {
    logger.error(`POSTGRES Connection Failed ${error}`);
  }
};
