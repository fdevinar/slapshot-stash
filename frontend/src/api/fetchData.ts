import type { CardDetails, Player } from '../api/types'

export async function fetchCards(): Promise<CardDetails[]> {
    const response = await fetch("http://localhost:3000/cards");
    if(!response.ok) {
            throw new Error(`Failed to fetch cards: ' ${response.status}`);                    
        }
    const data = await response.json();
    if (data) {
        console.log("Cards fetched successfully");        
    }    
    return data;
  }

export async function fetchPlayers(firstName: string, lastName: string) {
        const response = await fetch(`http://localhost:3000/players/search?firstName=${firstName}&lastName=${lastName}`);
        const data = await response.json();
        if (data) {                                    
            return data;                       
        }    
    }

export async function addPlayerToCache(player: Player) {     
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },            
        };
        const response = await fetch(`http://localhost:3000/players/${player.id}`,requestOptions);
        const data = await response.json();
        console.log(data);
        // return data;
    }
export async function addCardToTable(player: Player) {        
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
    // return data;    
}