import { useState } from 'react';
import type { CardDetails } from '../api/types'
import StatsTable from './StatsTable';

interface CardsTableProps {
  cards: CardDetails[];
}
interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  sortable: boolean;
}

export default function CardsTable({cards} : CardsTableProps) {

    // TODO: PASS SORT TO COMPONENT
  
    const [skaterSort, setSkaterSort] = useState<keyof CardDetails>('first_name');
    const [skaterSortOrder, setSkaterSortOrder] = useState<'asc' | 'desc'>('asc');    

    const skaterCards = cards.filter((card)=>card.position!=='G');    
    const sortedSkaterCards = [...skaterCards].sort((a, b) => {
      // const valA = a[skaterSort] || '';
      // const valB = b[skaterSort] || '';
      const valA = a[skaterSort];
      const valB = b[skaterSort];
      if (valA == null) return 1;
      if (valB == null) return -1;
      if (typeof valA === 'number' && typeof valB === 'number') {
        return skaterSortOrder === 'asc' ?  valA - valB : valB - valA;
      }
      return skaterSortOrder === 'asc' ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
    });

    const getSkaterSortSymbol = (key: keyof CardDetails) => {      
      if (key !== skaterSort) {
        return;
      }
      return skaterSortOrder === 'asc' ? '▲' : '▼';
    }

    function handleSkaterColumnSort(col: string) {
      console.log(col);
      setSkaterSort(col as keyof CardDetails);
      if (col === skaterSort) {
        setSkaterSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSkaterSortOrder('asc');
      }
    }

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

    // GOALIE

    const [goalieSort, setGoalieSort] = useState<keyof CardDetails>('first_name');
    const [goalieSortOrder, setGoalieSortOrder] = useState<'asc' | 'desc'>('asc');

    const goalieCards = cards.filter((card)=>card.position==='G');

    const sortedGoalieCards = [...goalieCards].sort((a, b) => {
      // const valA = a[skaterSort] || '';
      // const valB = b[skaterSort] || '';
      const valA = a[goalieSort];
      const valB = b[goalieSort];
      if (valA == null) return 1;
      if (valB == null) return -1;
      if (typeof valA === 'number' && typeof valB === 'number') {
        return goalieSortOrder === 'asc' ?  valA - valB : valB - valA;
      }
      return goalieSortOrder === 'asc' ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
    });

    const getGoalieSortSymbol = (key: keyof CardDetails) => {      
      if (key !== goalieSort) {
        return;
      }
      return goalieSortOrder === 'asc' ? '▲' : '▼';
    }

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

    

    function handleGoalieColumnSort(col: string) {
      console.log(col);
      setGoalieSort(col as keyof CardDetails);
      if (col === goalieSort) {
        setGoalieSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setGoalieSortOrder('asc');
      }
    }
    

    return (
        <>


        <StatsTable columns={skaterColumns} cards={sortedSkaterCards} />
        <StatsTable columns={goalieColumns} cards={sortedGoalieCards} />



        {/* SKATERS */}
        <table style={{display: 'none'}}>
          <thead>
              <tr>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='regular' colSpan={9}>REGULAR SEASON</th>
                <th className='playoffs' colSpan={9}>PLAYOFFS</th>                
              </tr>
            </thead>
          <thead>              
            <tr>
              {skaterColumns.map((col) =>
                <th onClick={()=>handleSkaterColumnSort(col.key)}>                        
                  {col.label}                                                
                  {getSkaterSortSymbol(col.key)}
                </th>
              )}
            </tr>              
          </thead>          
          <tbody>
              {sortedSkaterCards.map((card) =>                                
                <tr>
                  {skaterColumns.map((col) =>
                      <td>                        
                        {card[col.key]}
                      </td>
                  )}
                </tr>            
              )}
          </tbody>          
        </table>

        {/* GOALIES */}
        <table style={{display: 'none'}}>
          <thead>
              <tr>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='regular' colSpan={6}>REGULAR SEASON</th>
                <th className='playoffs' colSpan={6}>PLAYOFFS</th>                
              </tr>
            </thead>
          <thead>              
            <tr>
              {goalieColumns.map((col) =>
                <th onClick={()=>handleGoalieColumnSort(col.key)}>                        
                  {col.label}                                                
                  {getGoalieSortSymbol(col.key)}
                </th>
              )}
            </tr>              
          </thead>          
          <tbody>
              {sortedGoalieCards.map((card) =>                                
                <tr>
                  {goalieColumns.map((col) =>
                      <td>                        
                        {card[col.key]}
                      </td>
                  )}
                </tr>            
              )}
          </tbody>          
        </table>
        
        
        </>  
    )
}