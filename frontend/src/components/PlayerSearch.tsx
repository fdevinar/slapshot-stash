import { useState } from "react";
import type { Player } from "../api/types";

export default function PlayerSearch( onCardCreated: any ) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [playerList, setPlayerList] = useState<Player[]>([]);    



    async function fetchPlayers(firstName: string, lastName: string) {
        const response = await fetch(`http://localhost:3000/players/search?firstName=${firstName}&lastName=${lastName}`);
        const data = await response.json();
        if (data) {            
            console.log('Searched playerlist data:');
            console.log(data);
            setPlayerList(data);
            onCardCreated();
        }    
    }
    
    function handleSubmit(event: any) {
            event.preventDefault();            
            fetchPlayers(firstName, lastName);                        
    }

    // ON PLAYER SELECTION
    async function playerSelected(player: Player) {                
        await addPlayerToCache(player);        
        await addCardToTable(player);   
        
    }

    async function addPlayerToCache(player: Player) {        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },            
        };
        const response = await fetch(`http://localhost:3000/players/${player.id}`,requestOptions);
        const data = await response.json();
        console.log(data);
        return data;
    }
    async function addCardToTable(player: Player) {        
        // TODO - TEMPORARY CONST
        // const setId = 1;
        const reqBody = {
            setId: 1,
            playerId: player.id
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },            
            body: JSON.stringify(reqBody)
        };
        const response = await fetch('http://localhost:3000/cards/',requestOptions);
        const data = await response.json();
        console.log(data);    
    }
  

    return (
        <div className="search-container">
        
                <h2>Player Search</h2>            
                {/* FORM */}
                <form onSubmit={handleSubmit}>        
                <label>First Name</label>
                <input 
                type="text" 
                required
                value={firstName}
                onChange={(e)=> setFirstName(e.target.value)}
                />
                <label>Last Name</label>
                <input
                type="text" 
                required
                value={lastName}
                onChange={(e)=> setLastName(e.target.value)}
                />
                {/* <input type="submit" /> */}
                <button type="submit">Search</button>
                </form>

                {/* SEARCH LIST */}
                <table className="search">
                    <thead>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Position</th>
                        <th>#</th>
                    </thead>
                    {playerList &&
                        <tbody>
                            {playerList.map((player) => (
                                <tr onClick={() => playerSelected(player)}>
                                    <td> {player.fullName} </td>                            
                                    <td>{ player.currentTeamId }</td>                
                                    <td>{ player.positionCode }</td>
                                    <td>{ player.sweaterNumber }</td>
                                </tr>
                            )
                        )}                                 
                        </tbody>
                    }                     
                </table>

            </div>        
        
    )
} 

