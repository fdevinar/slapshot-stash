import pool from "../db/pool.js";

export async function deleteData() {
    const sqlQuery = 'TRUNCATE TABLE cards, player_cache RESTART IDENTITY;';
    const result = await pool.query(sqlQuery);
    return;
}