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

    const playerParams = [player.player_id, player.firstName, player.lastName, player.position, player.sweaterNumber, player.birthCountry, player.isActive, player.currentTeam, player.regGamesPlayed,
        player.regGoals, player.regAssists, player.regPoints, player.regGameWinningGoals, player.regOtGoals, player.regShootingPctg, player.regPlusMinus, player.regTimeOnIce,
        player.regSavePctg, player.regShutouts, player.regGoalsAgainst, player.regGoalsAgainstAvg, player.regShotsAgainst, player.playGamesPlayed, player.playGoals,
        player.playAssists, player.playPoints, player.playGameWinningGoals, player.playOtGoals, player.playShootingPctg, player.playPlusMinus, player.playTimeOnIce,
        player.playSavePctg, player.playShutouts, player.playGoalsAgainst, player.playGoalsAgainstAvg, player.playShotsAgainst]
    
    const sqlQuery =`INSERT INTO player_cache (
    player_id, first_name, last_name, position, sweater_number, birth_country, is_active, current_team, reg_games_played,
    reg_goals, reg_assists, reg_points, reg_game_winning_goals, reg_ot_goals, reg_shooting_pctg, reg_plus_minus, reg_time_on_ice,
    reg_save_pctg, reg_shutouts, reg_goals_against, reg_goals_against_avg, reg_shots_against, play_games_played, play_goals,
    play_assists, play_points, play_game_winning_goals, play_ot_goals, play_shooting_pctg, play_plus_minus, play_time_on_ice,
    play_save_pctg, play_shutouts, play_goals_against, play_goals_against_avg, play_shots_against, last_updated)
                    
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17,
                    $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, now())
                    
                    ON CONFLICT (player_id)
                    DO UPDATE SET
                    
                    first_name = EXCLUDED.first_name,
                    last_name = EXCLUDED.last_name,
                    position = EXCLUDED.position,
                    sweater_number = EXCLUDED.sweater_number,
                    birth_country = EXCLUDED.birth_country,
                    is_active = EXCLUDED.is_active,
                    current_team = EXCLUDED.current_team,
                    reg_games_played = EXCLUDED.reg_games_played,
                    reg_goals = EXCLUDED.reg_goals,
                    reg_assists = EXCLUDED.reg_assists,
                    reg_points = EXCLUDED.reg_points,
                    reg_game_winning_goals = EXCLUDED.reg_game_winning_goals,
                    reg_ot_goals = EXCLUDED.reg_ot_goals,
                    reg_shooting_pctg = EXCLUDED.reg_shooting_pctg,
                    reg_plus_minus = EXCLUDED.reg_plus_minus,
                    reg_time_on_ice = EXCLUDED.reg_time_on_ice,
                    reg_save_pctg = EXCLUDED.reg_save_pctg,
                    reg_shutouts = EXCLUDED.reg_shutouts,
                    reg_goals_against = EXCLUDED.reg_goals_against,
                    reg_goals_against_avg = EXCLUDED.reg_goals_against_avg,
                    reg_shots_against = EXCLUDED.reg_shots_against,
                    play_games_played = EXCLUDED.play_games_played,
                    play_goals = EXCLUDED.play_goals,
                    play_assists = EXCLUDED.play_assists,
                    play_points = EXCLUDED.play_points,
                    play_game_winning_goals = EXCLUDED.play_game_winning_goals,
                    play_ot_goals = EXCLUDED.play_ot_goals,
                    play_shooting_pctg = EXCLUDED.play_shooting_pctg,
                    play_plus_minus = EXCLUDED.play_plus_minus,
                    play_time_on_ice = EXCLUDED.play_time_on_ice,
                    play_save_pctg = EXCLUDED.play_save_pctg,
                    play_shutouts = EXCLUDED.play_shutouts,
                    play_goals_against = EXCLUDED.play_goals_against,
                    play_goals_against_avg = EXCLUDED.play_goals_against_avg,
                    play_shots_against = EXCLUDED.play_shots_against,
                    last_updated = now()
                    RETURNING *;`;

    const result = await pool.query(sqlQuery, playerParams);

    return result.rows[0];
}







