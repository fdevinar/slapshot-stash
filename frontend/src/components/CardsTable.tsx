import type { CardDetails } from '../api/types'

interface CardListProps {
  cards: CardDetails[];
}

export default function CardsTable({cards} : CardListProps) {

    console.log("What are my cards?", cards, Array.isArray(cards));

     
    return (
        
        <table>
            <thead>
              <tr>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='empty'></th>
                <th className='regular' colSpan={14}>REGULAR SEASON</th>
                <th className='playoffs' colSpan={14}>PLAYOFFS</th>                
              </tr>
            </thead>
            <thead>
              <tr>
                {/* <th>card_id</th>
                <th>set_id</th>
                <th>set_name</th> */}
                {/* // ** BASIC STATS ** */}
                {/* <th>player_id</th>
                <th>last_updated</th> */}
                {/* <th>first_name</th> */}
                <th>Name</th>
                <th>POS</th>
                <th>#</th>
                <th>Country</th>
                {/* <th>is_active</th> */}
                <th>Team</th>
                {/* // ** REGULAR SEASON **
                // SKATER */}
                <th>Games</th>
                <th>Goals</th>
                <th>Assists</th>
                <th>Points</th>
                <th>Game Winning Goals</th>
                <th>OT Goals</th>
                <th>Shoot %</th>
                <th>+/-</th>
                <th>TOI</th>
                {/* // GOALIE */}                
                <th>Save %</th>
                <th>Shutouts</th>
                <th>Goals Against</th>
                <th>Goals Against Avg</th>
                <th>Shots Against</th>
                {/* // ** PLAYOFFS **
                // SKATER */}
                <th>Games</th>
                <th>Goals</th>
                <th>Assists</th>
                <th>Points</th>
                <th>Game Winning Goals</th>
                <th>OT Goals</th>
                <th>Shoot %</th>
                <th>+/-</th>
                <th>TOI</th>
                {/* // GOALIE */}
                <th>Save %</th>
                <th>Shutouts</th>
                <th>Goals Against</th>
                <th>Goals Against Avg</th>
                <th>Shots Against</th>
              </tr>                      
            </thead>

            <tbody>
              {cards.map((card) =>
              <tr>
                {/* <td>{card.card_id}</td>
                <td>{card.set_id}</td>
                <td>{card.set_name}</td> */}
                {/* // ** BASIC STATS ** */}
                {/* <td>{card.player_id}</td>
                <td>{card.last_updated}</td> */}
                <td>{card.first_name} {card.last_name}</td>
                {/* <td>{card.last_name}</td> */}
                <td>{card.position}</td>
                <td>{card.sweater_number}</td>
                <td>{card.birth_country}</td>
                {/* <td>{card.is_active}</td> */}
                <td>{card.current_team}</td>
                {/* // ** REGULAR SEASON **
                // SKATER */}
                <td>{card.reg_games_played}</td>
                <td>{card.reg_goals}</td>
                <td>{card.reg_assists}</td>
                <td>{card.reg_points}</td>
                <td>{card.reg_game_winning_goals}</td>
                <td>{card.reg_ot_goals}</td>
                <td>{card.reg_shooting_pctg}</td>
                <td>{card.reg_plus_minus}</td>
                <td>{card.reg_time_on_ice}</td>
                {/* // GOALIE */}
                <td>{card.reg_save_pctg}</td>
                <td>{card.reg_shutouts}</td>
                <td>{card.reg_goals_against}</td>
                <td>{card.reg_goals_against_avg}</td>
                <td>{card.reg_shots_against}</td>
                {/* // ** PLAYOFFS **
                // SKATER */}
                <td>{card.play_games_played}</td>
                <td>{card.play_goals}</td>
                <td>{card.play_assists}</td>
                <td>{card.play_points}</td>
                <td>{card.play_game_winning_goals}</td>
                <td>{card.play_ot_goals}</td>
                <td>{card.play_shooting_pctg}</td>
                <td>{card.play_plus_minus}</td>
                <td>{card.play_time_on_ice}</td>
                {/* // GOALIE */}
                <td>{card.play_save_pctg}</td>
                <td>{card.play_shutouts}</td>
                <td>{card.play_goals_against}</td>
                <td>{card.play_goals_against_avg}</td>
                <td>{card.play_shots_against}</td>
              </tr>          
              )}
            </tbody>

          </table>
                
    )
}