import type { CardDetails } from '../api/types'

interface CardsTableProps {
  cards: CardDetails[];
}

export default function CardsTable({cards} : CardsTableProps) {
  
    // TODO: SORTING TABLES


    const skaterCards = cards.filter((card)=>card.position!=='G');
    const goalieCards = cards.filter((card)=>card.position==='G');

    return (
        
        <div className="players-container">
        {/* SKATER TABLE */}
          <h2>SKATERS</h2>
          <table>
            <thead>
              <tr>
                <td className='empty'></td>
                <td className='empty'></td>
                <td className='empty'></td>
                <td className='empty'></td>
                <td className='empty'></td>
                <td className='regular' colSpan={9}>REGULAR SEASON</td>
                <td className='playoffs' colSpan={9}>PLAYOFFS</td>                
              </tr>
            </thead>
            <thead>
              <tr>                
                {/* BASIC STATS */}
                <td>Name</td>
                <td>POS</td>
                <td>#</td>
                <td>Country</td>                
                <td>Team</td>                
                {/* REGULAR SEASON */}
                <td>Games</td>
                <td>Goals</td>
                <td>Assists</td>
                <td>Points</td>
                <td>Game Winning Goals</td>
                <td>OT Goals</td>
                <td>Shoot %</td>
                <td>+/-</td>
                <td>TOI</td>                
                {/* PLAYOFFS */}
                <td>Games</td>
                <td>Goals</td>
                <td>Assists</td>
                <td>Points</td>
                <td>Game Winning Goals</td>
                <td>OT Goals</td>
                <td>Shoot %</td>
                <td>+/-</td>
                <td>TOI</td>              
              </tr>                      
            </thead>

            <tbody>
              {skaterCards.map((card) =>
              <tr key={card.card_id}>                                
                {/* BASIC STATS           */}
                <td>{card.first_name} {card.last_name}</td>                
                <td>{card.position}</td>
                <td>{card.sweater_number}</td>
                <td>{card.birth_country}</td>                
                <td>{card.current_team}</td>
                {/* REGULAR SEASON */}
                <td>{card.reg_games_played}</td>
                <td>{card.reg_goals}</td>
                <td>{card.reg_assists}</td>
                <td>{card.reg_points}</td>
                <td>{card.reg_game_winning_goals}</td>
                <td>{card.reg_ot_goals}</td>
                <td>{card.reg_shooting_pctg}</td>
                <td>{card.reg_plus_minus}</td>
                <td>{card.reg_time_on_ice}</td>                
                {/* PLAYOFFS */}
                <td>{card.play_games_played}</td>
                <td>{card.play_goals}</td>
                <td>{card.play_assists}</td>
                <td>{card.play_points}</td>
                <td>{card.play_game_winning_goals}</td>
                <td>{card.play_ot_goals}</td>
                <td>{card.play_shooting_pctg}</td>
                <td>{card.play_plus_minus}</td>
                <td>{card.play_time_on_ice}</td>                
              </tr>          
              )}
            </tbody>
          </table>

          {/* GOALIE TABLE */}
          <h2>GOALIES</h2>
          <table>
              <thead>
                <tr>
                  <td className='empty'></td>
                  <td className='empty'></td>
                  <td className='empty'></td>
                  <td className='empty'></td>
                  <td className='empty'></td>
                  <td className='regular' colSpan={6}>REGULAR SEASON</td>
                  <td className='playoffs' colSpan={6}>PLAYOFFS</td>                
                </tr>
              </thead>
              <thead>
                <tr>
                  
                  {/* BASIC STATS */}
                  <td>Name</td>
                  <td>POS</td>
                  <td>#</td>
                  <td>Country</td>                
                  <td>Team</td>                
                  {/* REGULAR SEASON */}                            
                  <td>Games</td>                  
                  <td>Save %</td>
                  <td>Shutouts</td>
                  <td>Goals Against</td>
                  <td>Goals Against Avg</td>
                  <td>Shots Against</td>
                  {/* PLAYOFFS */}                                    
                  <td>Games</td>
                  <td>Save %</td>
                  <td>Shutouts</td>
                  <td>Goals Against</td>
                  <td>Goals Against Avg</td>
                  <td>Shots Against</td>
                </tr>                      
              </thead>

              <tbody>
                {goalieCards.map((card) =>
                <tr key={card.card_id}>
                                  
                  {/* BASIC STATS            */}
                  <td>{card.first_name} {card.last_name}</td>                
                  <td>{card.position}</td>
                  <td>{card.sweater_number}</td>
                  <td>{card.birth_country}</td>                
                  <td>{card.current_team}</td>
                  {/* REGULAR SEASON */}
                  <td>{card.reg_games_played}</td>                                    
                  <td>{card.reg_save_pctg}</td>
                  <td>{card.reg_shutouts}</td>
                  <td>{card.reg_goals_against}</td>
                  <td>{card.reg_goals_against_avg}</td>
                  <td>{card.reg_shots_against}</td>
                  {/* PLAYOFFS */}
                  <td>{card.play_games_played}</td>                  
                  <td>{card.play_save_pctg}</td>
                  <td>{card.play_shutouts}</td>
                  <td>{card.play_goals_against}</td>
                  <td>{card.play_goals_against_avg}</td>
                  <td>{card.play_shots_against}</td>
                </tr>          
                )}
              </tbody>
            </table>
        
        </div>
                
    )
}