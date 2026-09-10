import { fetchData } from "../utils/helpers.js";

interface PlayerData {
    id: number;
    currentTeamId: number | null;
    fullName: string;
    position: string;
    sweaterNumber: number;
}

// FETCH PLAYER ID FROM NHL API
async function fetchPlayerId(firstName: string, lastName: string): Promise<Array<PlayerData>> {
    
    const reqString = buildPlayerSearchUrl(firstName, lastName);
    const playerData = await fetchData(reqString);
    
    // console.log(playerData.data);
    return playerData.data as PlayerData[];    
}

// const logThis = await fetchPlayerId('Sebastian', 'Aho');
// console.log(logThis);

// BUILD SEARCH URL
function buildPlayerSearchUrl(firstName: string, lastName: string): string {
    const cayenneExp = `firstName likeIgnoreCase '%${firstName}%' and lastName likeIgnoreCase '%${lastName}%'`;
    const encodedExp = encodeURIComponent(cayenneExp);
    return `https://api.nhle.com/stats/rest/en/players?cayenneExp=${encodedExp}`;
}