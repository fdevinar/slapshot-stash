import pool from '../db/pool.js';

interface Card {
    id: number;
    playerId: number;
    setId: number;
}

export async function createCard(playerId: number, setId: number): Promise<Card> {
    const sqlQuery = 'INSERT INTO cards (player_id, set_id) VALUES ($1, $2) RETURNING *;'
    const result = await pool.query(sqlQuery, [playerId, setId]);
    return result.rows[0];
}
export async function getCards(): Promise<Card[]> {
    // TODO: JOIN RESULTS OF CARDS, SETS AND PLAYERS
    const sqlQuery = 'SELECT * FROM cards;';    
    const result = await pool.query(sqlQuery);
    return result.rows;
}