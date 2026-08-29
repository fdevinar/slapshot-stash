import { Pool } from "pg";
import { config } from '../config.js'
import { readFile } from "node:fs/promises";

const pool = new Pool( {connectionString: config.databaseUrl} );

// TESTING POOL
// const result = await pool.query('SELECT 1');
// if (result.rowCount) { console.log("Pool Query OK"); }

const sqlUrl = new URL('./schema.sql', import.meta.url);
const sqlQuery = await readFile(sqlUrl, 'utf8');

try {
    const res = await pool.query(sqlQuery);
    console.log("✅ Table created successfully!");
} catch(err) {
    if (err instanceof Error) {
        console.error("❌ Error creating table:", err.stack);
    } else {
        console.error("❌ Unknown error", err);    
    }
} finally {
    pool.end();
}

export default pool;