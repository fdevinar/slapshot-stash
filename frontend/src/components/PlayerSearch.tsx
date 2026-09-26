import { useState, useEffect } from "react";

export default function PlayerSearch() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [playerList, setPlayerList] = useState<Player[]>([]);

    interface Player {
        id: number,
        currentTeamId: number,
        firstName: string,
        fullName: string,
        lastName: string,
        positionCode: string,
        sweaterNumber: number
    }



    async function fetchPlayers(firstName: string, lastName: string) {
        const response = await fetch(`http://localhost:3000/players/search?firstName=${firstName}&lastName=${lastName}`);
        const data = await response.json();
        if (data) {            
            console.log('Searched playerlist data:');
            console.log(data);
            setPlayerList(data);
        }    
    }
    
    function handleSubmit(event: any) {
            event.preventDefault();            
            fetchPlayers(firstName, lastName);                        
    }

    function playerSelected(player: Player) {        
        addPlayerToCards(player);
    }

    async function addPlayerToCards(player: Player) {
        const reqBody = {
            "playerId": player.id ,
            "setId" : 1
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqBody)
      };
    const response = await fetch('http://localhost:3000/players/',requestOptions);
    const data = await response.json();
    console.log(data);
    
  }
    
    return (
        <>
            <p>Player Search</p>
            <form onSubmit={handleSubmit}>        
            <label>First Name</label>
            <textarea 
            //   type="text" 
              required
              value={firstName}
              onChange={(e)=> setFirstName(e.target.value)}
            />
            <label>Last Name</label>
            <textarea 
            //   type="text" 
              required
              value={lastName}
              onChange={(e)=> setLastName(e.target.value)}
            />
            <input type="submit" />
        </form>
        <p>Searched Players</p>

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

        </>        
    )
} 

