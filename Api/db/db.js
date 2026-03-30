// import { Pool } from "pg";


// const pool = new Pool({
//   connectionString: process.env.db,
//   ssl: { rejectUnauthorized: false }
// });

// export default pool;

import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv'

dotenv.config()

const sql = neon(process.env.db);

export const connectDB = async () => {
  try {
    await sql`SELECT 1`;
    console.log("DATABASE CONNECTED");
  } catch (error) {
    console.error("FAILED TO CONNECT TO DB", error);
    process.exit(1);
  }
};

export default sql;