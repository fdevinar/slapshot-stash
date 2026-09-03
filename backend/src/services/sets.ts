import pool from "../db/pool.js";

interface Set {
    id: number;
    name: string;
}

export async function createSet(name: string): Promise<Set> {
    const sqlQuery = 'INSERT INTO sets (name) VALUES ($1) RETURNING *;';    
    const result = await pool.query(sqlQuery, [name]);
    return result.rows[0];
}

export async function getSets(): Promise<Array<Set>> {
    const sqlQuery = 'SELECT * FROM sets;';    
    const result = await pool.query(sqlQuery);
    return result.rows;
}

// export default createSet;