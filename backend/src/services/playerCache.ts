import pool from '../db/pool.js';

interface LandingData {        
    // ** BASIC STATS **
    player_id: number;
    firstName: string,
    lastName: string,
    position: string;
    sweaterNumber: number;
    birthCountry: string,
    isActive: boolean,
    currentTeam: string | null;    
    // ** REGULAR SEASON **
    // SKATER
    regGamesPlayed: number | null;
    regGoals: number | null;
    regAssists: number | null;
    regPoints: number | null;
    regGameWinningGoals: number | null;
    regOtGoals: number | null;
    regShootingPctg: number | null;
    regPlusMinus: number | null;
    regTimeOnIce: number | null;
    // GOALIE  
    regSavePctg: number | null;
    regShutouts: number | null;
    regGoalsAgainst: number | null;
    regGoalsAgainstAvg: number | null;
    regShotsAgainst: number | null;
    // ** PLAYOFFS **
    // SKATER
    playGamesPlayed: number | null;
    playGoals: number | null;
    playAssists: number | null;
    playPoints: number | null;
    playGameWinningGoals: number | null;
    playOtGoals: number | null;
    playShootingPctg: number | null;
    playPlusMinus: number | null;
    playTimeOnIce: number | null;
    // GOALIE  
    playSavePctg: number | null;
    playShutouts: number | null;
    playGoalsAgainst: number | null;
    playGoalsAgainstAvg: number | null;
    playShotsAgainst: number | null;
}

export async function upsertPlayer(player: LandingData): Promise<LandingData> {
    
    const sqlQuery =`INSERT INTO player_cache (
    player_id, firstName, lastName, position, sweaterNumber, birthCountry, isActive, currentTeam, regGamesPlayed,
    regGoals, regAssists, regPoints, regGameWinningGoals, regOtGoals, regShootingPctg, regPlusMinus, regTimeOnIce,
    regSavePctg, regShutouts, regGoalsAgainst, regGoalsAgainstAvg, regShotsAgainst, playGamesPlayed, playGoals,
    playAssists, playPoints, playGameWinningGoals, playOtGoals, playShootingPctg, playPlusMinus, playTimeOnIce,
    playSavePctg, playShutouts, playGoalsAgainst, playGoalsAgainstAvg, playShotsAgainst, last_updated)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17,
                    $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, now())
                    ON CONFLICT (player_id)
                    DO UPDATE SET
                    firstName = EXCLUDED.firstName,
                    lastName = EXCLUDED.lastName,
                    position = EXCLUDED.position,
                    sweaterNumber = EXCLUDED.sweaterNumber,
                    birthCountry = EXCLUDED.birthCountry,
                    isActive = EXCLUDED.isActive,
                    currentTeam = EXCLUDED.currentTeam,
                    regGamesPlayed = EXCLUDED.regGamesPlayed,
                    regGoals = EXCLUDED.regGoals,
                    regAssists = EXCLUDED.regAssists,
                    regPoints = EXCLUDED.regPoints,
                    regGameWinningGoals = EXCLUDED.regGameWinningGoals,
                    regOtGoals = EXCLUDED.regOtGoals,
                    regShootingPctg = EXCLUDED.regShootingPctg,
                    regPlusMinus = EXCLUDED.regPlusMinus,
                    regTimeOnIce = EXCLUDED.regTimeOnIce,
                    regSavePctg = EXCLUDED.regSavePctg,
                    regShutouts = EXCLUDED.regShutouts,
                    regGoalsAgainst = EXCLUDED.regGoalsAgainst,
                    regGoalsAgainstAvg = EXCLUDED.regGoalsAgainstAvg,
                    regShotsAgainst = EXCLUDED.regShotsAgainst,
                    playGamesPlayed = EXCLUDED.playGamesPlayed,
                    playGoals = EXCLUDED.playGoals,
                    playAssists = EXCLUDED.playAssists,
                    playPoints = EXCLUDED.playPoints,
                    playGameWinningGoals = EXCLUDED.playGameWinningGoals,
                    playOtGoals = EXCLUDED.playOtGoals,
                    playShootingPctg = EXCLUDED.playShootingPctg,
                    playPlusMinus = EXCLUDED.playPlusMinus,
                    playTimeOnIce = EXCLUDED.playTimeOnIce,
                    playSavePctg = EXCLUDED.playSavePctg,
                    playShutouts = EXCLUDED.playShutouts,
                    playGoalsAgainst = EXCLUDED.playGoalsAgainst,
                    playGoalsAgainstAvg = EXCLUDED.playGoalsAgainstAvg,
                    playShotsAgainst = EXCLUDED.playShotsAgainst,
                    last_updated = now();`;    

    const result = await pool.query(sqlQuery, [player]);

    return result.rows[0];
}







