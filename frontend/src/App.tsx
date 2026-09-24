import { useState, useEffect } from 'react'
// import heroImg from './assets/hero.png'
// import { fetchCards } from './api/fetchData';
import './App.css'

function App() {
  const [cards, setCards] = useState<CardDetails[]>([]);

  interface CardDetails {
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

  async function fetchCards() {    
    const response = await fetch("http://localhost:3000/cards");
    const data = await response.json();
    if (data) {
        console.log("Fetched cards:");
        console.log(data);
    }
    // setRuns(data);    
    // return data;
    setCards(data);
  }

   useEffect(() => {
    // const cardList = await fetchCards();
    // setCards(cardList);
    fetchCards();
  },[])

  return (
    <>
      <main>
        <h1>SLAPSHOT STASH</h1>     
        
        <div className="main-cards">

        

          <ul className="cards-wrapper subtitle">
            
            <li className="card">
              <span>card_id</span>
              <span>set_id</span>
              <span>set_name</span>
              {/* // ** BASIC STATS ** */}
              <span>player_id</span>
              <span>last_updated</span>
              <span>first_name</span>
              <span>last_name</span>
              <span>position</span>
              <span>sweater_number</span>
              <span>birth_country</span>
              <span>is_active</span>
              <span>current_team</span>
              {/* // ** REGULAR SEASON **
              // SKATER */}
              <span>reg_games_played</span>
              <span>reg_goals</span>
              <span>reg_assists</span>
              <span>reg_points</span>
              <span>reg_game_winning_goals</span>
              <span>reg_ot_goals</span>
              <span>reg_shooting_pctg</span>
              <span>reg_plus_minus</span>
              <span>reg_time_on_ice</span>
              {/* // GOALIE */}
              <span>reg_save_pctg</span>
              <span>reg_shutouts</span>
              <span>reg_goals_against</span>
              <span>reg_goals_against_avg</span>
              <span>reg_shots_against</span>
              {/* // ** PLAYOFFS **
              // SKATER */}
              <span>play_games_played</span>
              <span>play_goals</span>
              <span>play_assists</span>
              <span>play_points</span>
              <span>play_game_winning_goals</span>
              <span>play_ot_goals</span>
              <span>play_shooting_pctg</span>
              <span>play_plus_minus</span>
              <span>play_time_on_ice</span>
              {/* // GOALIE */}
              <span>play_save_pctg</span>
              <span>play_shutouts</span>
              <span>play_goals_against</span>
              <span>play_goals_against_avg</span>
              <span>play_shots_against</span>
            </li>          
            
          </ul>




          <ul className="cards-wrapper">
            {cards.map((card) =>
            <li className="card">
              <span>{card.card_id}</span>
              <span>{card.set_id}</span>
              <span>{card.set_name}</span>
              {/* // ** BASIC STATS ** */}
              <span>{card.player_id}</span>
              <span>{card.last_updated}</span>
              <span>{card.first_name}</span>
              <span>{card.last_name}</span>
              <span>{card.position}</span>
              <span>{card.sweater_number}</span>
              <span>{card.birth_country}</span>
              <span>{card.is_active}</span>
              <span>{card.current_team}</span>
              {/* // ** REGULAR SEASON **
              // SKATER */}
              <span>{card.reg_games_played}</span>
              <span>{card.reg_goals}</span>
              <span>{card.reg_assists}</span>
              <span>{card.reg_points}</span>
              <span>{card.reg_game_winning_goals}</span>
              <span>{card.reg_ot_goals}</span>
              <span>{card.reg_shooting_pctg}</span>
              <span>{card.reg_plus_minus}</span>
              <span>{card.reg_time_on_ice}</span>
              {/* // GOALIE */}
              <span>{card.reg_save_pctg}</span>
              <span>{card.reg_shutouts}</span>
              <span>{card.reg_goals_against}</span>
              <span>{card.reg_goals_against_avg}</span>
              <span>{card.reg_shots_against}</span>
              {/* // ** PLAYOFFS **
              // SKATER */}
              <span>{card.play_games_played}</span>
              <span>{card.play_goals}</span>
              <span>{card.play_assists}</span>
              <span>{card.play_points}</span>
              <span>{card.play_game_winning_goals}</span>
              <span>{card.play_ot_goals}</span>
              <span>{card.play_shooting_pctg}</span>
              <span>{card.play_plus_minus}</span>
              <span>{card.play_time_on_ice}</span>
              {/* // GOALIE */}
              <span>{card.play_save_pctg}</span>
              <span>{card.play_shutouts}</span>
              <span>{card.play_goals_against}</span>
              <span>{card.play_goals_against_avg}</span>
              <span>{card.play_shots_against}</span>
            </li>          
            )}
          </ul>


        </div>

      </main>
    </>
  )
}

export default App
