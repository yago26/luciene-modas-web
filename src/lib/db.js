import { Pool } from "pg";

let pool;

if (!global._pgPool) {
  global._pgPool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    max: 5, // evita abrir 20 conexões em dev
    ssl: { rejectUnauthorized: false },
  });
}

pool = global._pgPool;

export default pool;
