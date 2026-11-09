import type { CardDetails, Player } from '../api/types'
import { ApiError, NetworkError } from './errors';


async function fetchHelper(url: string,  reqOptions?: RequestInit): Promise<Response> {
    try {
        return await fetch (url, reqOptions);
    }
    catch(error) {
        console.log(error);
        throw new NetworkError('Could not reach server', {cause: error});
    }
}

export async function fetchCards(): Promise<CardDetails[]> {
    const response = await fetchHelper("http://localhost:3000/cards");
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
    const response = await fetchHelper(`http://localhost:3000/players/search?firstName=${firstName}&lastName=${lastName}`);
    const data = await response.json();
    if (data) {
        return data;
    }
}

export async function fetchSets() {
    const response = await fetchHelper('http://localhost:3000/sets');
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
    const response = await fetchHelper(`http://localhost:3000/players/${player.id}`,requestOptions);        
    const data = await response.json();            
    console.log(data);                
}
    
export async function addCardToTable(player: Player, setId: string) {
    const convertedSetId = Number(setId);
    const reqBody = {
        setId: convertedSetId,
        playerId: player.id
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },            
        body: JSON.stringify(reqBody)
    };
    const response = await fetchHelper('http://localhost:3000/cards/',requestOptions);    
    const data = await response.json();        
    // CUSTOM ERROR
    if (!response.ok) {                
        throw new ApiError(data.error, response.status);
    }                        
}