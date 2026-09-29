import type { CardDetails } from '../api/types'

interface CardsTableProps {
  cards: CardDetails[];
}

export default function CardsTable({cards} : CardsTableProps) {
     
    // TODO: SEPARATE SKATERS AND GOALIES

    return (
        
        <table>
            <thead>
              <tr>
                <td className='empty'></td>
                <td className='empty'></td>
                <td className='empty'></td>
                <td className='empty'></td>
                <td className='empty'></td>
                <td className='regular' colSpan={14}>REGULAR SEASON</td>
                <td className='playoffs' colSpan={14}>PLAYOFFS</td>                
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
                <td>Name</td>
                <td>POS</td>
                <td>#</td>
                <td>Country</td>
                {/* <td>is_active</th> *d}
                <td>Team</td>
                {/* // ** REGULAR SEASON **
                // SKATER */}
                <td>Games</td>
                <td>Goals</td>
                <td>Assists</td>
                <td>Points</td>
                <td>Game Winning Goals</td>
                <td>OT Goals</td>
                <td>Shoot %</td>
                <td>+/-</td>
                <td>TOI</td>
                {/* // GOALIE */}                
                <td>Save %</td>
                <td>Shutouts</td>
                <td>Goals Against</td>
                <td>Goals Against Avg</td>
                <td>Shots Against</td>
                {/* // ** PLAYOFFS **
                // SKATER */}
                <td>Games</td>
                <td>Goals</td>
                <td>Assists</td>
                <td>Points</td>
                <td>Game Winning Goals</td>
                <td>OT Goals</td>
                <td>Shoot %</td>
                <td>+/-</td>
                <td>TOI</td>
                {/* // GOALIE */}
                <td>Save %</td>
                <td>Shutouts</td>
                <td>Goals Against</td>
                <td>Goals Against Avg</td>
                <td>Shots Against</td>
              </tr>                      
            </thead>

            <tbody>
              {cards.map((card) =>
              <tr key={card.card_id}>
                
                {/*<td>{card.set_id}</td>
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