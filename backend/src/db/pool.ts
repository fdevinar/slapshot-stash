import { Pool } from "pg";
import { config } from '../config.js'

const pool = new Pool( {connectionString: config.databaseUrl} );

// TESTING POOL
// const result = await pool.query('SELECT 1');
// if (result.rowCount) {
//   console.log("Pool Query OK");
// }

export default pool;