import type { CardDetails } from '../api/types'
import type { ColumnConfig } from './types';
import StatsTable from './StatsTable';

interface CardsTableProps {
  cards: CardDetails[];
}

export default function CardsTable({cards} : CardsTableProps) {
    
    const skaterCards = cards.filter((card)=>card.position!=='G');    
    const goalieCards = cards.filter((card)=>card.position==='G');    

    const skaterColumns: ColumnConfig<CardDetails>[] = [
      { key: 'first_name', label: "First name", sortable: true},
      { key: 'last_name', label: "Last name", sortable: true},
      { key: 'position', label: "Position", sortable: true},
      { key: 'sweater_number', label: "Sweater #", sortable: true},
      { key: 'birth_country', label: "Birth country", sortable: true},      
      { key: 'current_team' , label: "Current team", sortable: true},
      { key: 'reg_games_played', label: "Games", sortable: true},
      { key: 'reg_goals', label: "Goals", sortable: true},
      { key: 'reg_assists', label: "Assists", sortable: true},
      { key: 'reg_points', label: "Points", sortable: true},
      { key: 'reg_game_winning_goals', label: "Game Winning Goals", sortable: true},
      { key: 'reg_ot_goals', label: "OT Goals", sortable: true},
      { key: 'reg_shooting_pctg', label: "Shooting %", sortable: true},
      { key: 'reg_plus_minus', label: "+/-", sortable: true},
      { key: 'reg_time_on_ice' , label: "TOI", sortable: true},
      { key: 'play_games_played', label: "Games", sortable: true},
      { key: 'play_goals', label: "Goals", sortable: true},
      { key: 'play_assists', label: "Assists", sortable: true},
      { key: 'play_points', label: "Points", sortable: true},
      { key: 'play_game_winning_goals', label: "Game Winning Goals", sortable: true},
      { key: 'play_ot_goals', label: "OT Goals", sortable: true},
      { key: 'play_shooting_pctg', label: "Shooting %", sortable: true},
      { key: 'play_plus_minus', label: "+/-", sortable: true},
      { key: 'play_time_on_ice' , label: "TOI", sortable: true}
  ]   

    const goalieColumns: ColumnConfig<CardDetails>[] = [        
      { key: 'first_name', label: "First name", sortable: true},
      { key: 'last_name', label: "Last name", sortable: true},
      { key: 'position', label: "Position", sortable: true},
      { key: 'sweater_number', label: "Sweater #", sortable: true},
      { key: 'birth_country', label: "Birth country", sortable: true},      
      { key: 'current_team' , label: "Current team", sortable: true},
      { key: 'reg_games_played', label: "Games", sortable: true},
      { key: 'reg_save_pctg', label: "Save %", sortable: true},
      { key: 'reg_shutouts', label: "Shutouts", sortable: true},
      { key: 'reg_goals_against', label: "Goals Against", sortable: true},
      { key: 'reg_goals_against_avg', label: "Goals Against Avg", sortable: true},
      { key: 'reg_shots_against', label: "Shots Against", sortable: true},
      { key: 'play_games_played', label: "Games", sortable: true},
      { key: 'play_save_pctg', label: "Save %", sortable: true},
      { key: 'play_shutouts', label: "Shutouts", sortable: true},
      { key: 'play_goals_against', label: "Goals Against", sortable: true},
      { key: 'play_goals_against_avg', label: "Goals Against Avg", sortable: true},
      { key: 'play_shots_against', label: "Shots Agaisnt", sortable: true},      
  ]   

    return (
        <>
          <StatsTable columns={skaterColumns} cards={skaterCards} />
          <StatsTable columns={goalieColumns} cards={goalieCards} />
        </>  
    )
}