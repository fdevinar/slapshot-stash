export interface CardDetails {
        card_id: number,
        set_id: number,
        set_name: string,
        // ** BASIC STATS **
        player_id: number,
        last_updated: string,
        first_name: string,
        last_name: string,
        position: string,
        sweater_number: number,
        birth_country: string,
        is_active: boolean,
        current_team: string | null,
        // ** REGULAR SEASON **
        // SKATER
        reg_games_played: number | null
        reg_goals: number | null
        reg_assists: number | null
        reg_points: number | null
        reg_game_winning_goals: number | null
        reg_ot_goals: number | null
        reg_shooting_pctg: number | null,
        reg_plus_minus: number | null,
        reg_time_on_ice: number | null,
        // GOALIE
        reg_save_pctg: number | null,
        reg_shutouts: number | null,
        reg_goals_against: number | null,
        reg_goals_against_avg: number | null,
        reg_shots_against: number | null,
        // ** PLAYOFFS **
        // SKATER
        play_games_played: number | null,
        play_goals: number | null,
        play_assists: number | null,
        play_points: number | null,
        play_game_winning_goals: number | null,
        play_ot_goals: number | null,
        play_shooting_pctg: number | null,
        play_plus_minus: number | null,
        play_time_on_ice: number | null,
        // GOALIE
        play_save_pctg: number | null,
        play_shutouts: number | null,
        play_goals_against: number | null,
        play_goals_against_avg: number | null,
        play_shots_against: number | null
    }

export interface Player {
        id: number,
        currentTeamId: number,
        firstName: string,
        fullName: string,
        lastName: string,
        positionCode: string,
        sweaterNumber: number
    }