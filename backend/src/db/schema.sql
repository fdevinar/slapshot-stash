create table "player_cache" (
--   BASIC
  "player_id" INT not null,
  "stats_updated_at" TIMESTAMP not null default now(),
  "first_name" varchar(255) not null,
  "last_name" varchar(255) not null,
  "position" varchar(255) not null,
  "birth_country" varchar(255) not null,
  "is_active" BOOLEAN not null,
  "current_team" varchar(255) null,
--   REGULAR SEASON
    -- SKATERS
  "reg_games_played" INT null,
  "reg_goals" INT null,
  "reg_assists" INT null,
  "reg_points" INT null,
  "reg_game_winning_goals" INT null,
  "reg_ot_goals" INT null,
  "reg_shooting_pctg" NUMERIC(4,3) null,
  "reg_plus_minus" INT null,
  "reg_time_on_ice" INT null,
    --   GOALIES
  "reg_save_pctg" NUMERIC(4,3) null,
  "reg_shutouts" INT null,
  "reg_goals_against" INT null,
  "reg_goals_against_avg" NUMERIC(4,3) null,
  "reg_shots_against" INT null,
--   PLAYOFFS
    -- SKATERS
  "play_games_played" INT null,
  "play_goals" INT null,
  "play_assists" INT null,
  "play_points" INT null,
  "play_game_winning_goals" INT null,
  "play_ot_goals" INT null,
  "play_shooting_pctg" NUMERIC(4,3) null,
  "play_plus_minus" INT null,
  "play_time_on_ice" INT null,
    --   GOALIES
  "play_save_pctg" NUMERIC(4,3) null,
  "play_shutouts" INT null,
  "play_goals_against" INT null,
  "play_goals_against_avg" NUMERIC(4,3) null,
  "play_shots_against" INT null,
  constraint "player_cache_pkey" primary key ("player_id")
)