import { fetchData } from "../utils/helpers.js";

interface LandingData {        
    // ** BASIC STATS **
    id: number;
    firstName: string,
    lastName: string,
    position: string;
    sweaterNumber: number;
    birthCountry: string,
    isActive: boolean,
    currentTeam: string | null;    
    // ** REGULAR SEASON **
    // SKATER
    regGamesPlayed: number | null;
    regGoals: number | null;
    regAssists: number | null;
    regPoints: number | null;
    regGameWinningGoals: number | null;
    regOtGoals: number | null;
    regShootingPctg: number | null;
    regPlusMinus: number | null;
    regTimeOnIce: number | null;
    // GOALIE  
    regSavePctg: number | null;
    regShutouts: number | null;
    regGoalsAgainst: number | null;
    regGoalsAgainstAvg: number | null;
    regShotsAgainst: number | null;
    // ** PLAYOFFS **
    // SKATER
    playGamesPlayed: number | null;
    playGoals: number | null;
    playAssists: number | null;
    playPoints: number | null;
    playGameWinningGoals: number | null;
    playOtGoals: number | null;
    playShootingPctg: number | null;
    playPlusMinus: number | null;
    playTimeOnIce: number | null;
    // GOALIE  
    playSavePctg: number | null;
    playShutouts: number | null;
    playGoalsAgainst: number | null;
    playGoalsAgainstAvg: number | null;
    playShotsAgainst: number | null;
}
                
// FETCH PLAYER FROM NHL API
async function fetchPlayerData(id: number): Promise<LandingData> {
                    
    const playerUrl = `https://api-web.nhle.com/v1/player/${id}/landing`;
    const playerStats = await fetchData(playerUrl);
        
    const player = {
        // ** BASIC STATS **
        id: playerStats.playerId,
        firstName: playerStats.firstName.default,
        lastName: playerStats.lastName.default,
        position: playerStats.position,        
        sweaterNumber: playerStats.sweaterNumber,
        birthCountry: playerStats.birthCountry,
        isActive: playerStats.isActive,
        currentTeam: playerStats.fullTeamName?.default,
        
        // ** REGULAR SEASON **
        // SKATER
        regGamesPlayed: playerStats.careerTotals.regularSeason?.gamesPlayed,
        regGoals: playerStats.careerTotals.regularSeason?.goals,
        regAssists: playerStats.careerTotals.regularSeason?.assists,
        regPoints: playerStats.careerTotals.regularSeason?.points,
        regGameWinningGoals: playerStats.careerTotals.regularSeason?.gameWinningGoals,
        regOtGoals: playerStats.careerTotals.regularSeason?.otGoals,
        regShootingPctg: playerStats.careerTotals.regularSeason?.shootingPctg,
        regPlusMinus: playerStats.careerTotals.regularSeason?.plusMinus,
        regTimeOnIce: playerStats.careerTotals.regularSeason?.avgToi,
        // GOALIE
        regSavePctg: playerStats.careerTotals.regularSeason?.savePctg,
        regShutouts: playerStats.careerTotals.regularSeason?.shutouts,
        regGoalsAgainst: playerStats.careerTotals.regularSeason?.goalsAgainst,
        regGoalsAgainstAvg: playerStats.careerTotals.regularSeason?.goalsAgainstAvg,
        regShotsAgainst: playerStats.careerTotals.regularSeason?.shotsAgainst,
        
        // ** PLAYOFFS **
        // SKATER
        playGamesPlayed: playerStats.careerTotals.playoffs?.gamesPlayed,
        playGoals: playerStats.careerTotals.playoffs?.goals,
        playAssists: playerStats.careerTotals.playoffs?.assists,
        playPoints: playerStats.careerTotals.playoffs?.points,
        playGameWinningGoals: playerStats.careerTotals.playoffs?.gameWinningGoals,
        playOtGoals: playerStats.careerTotals.playoffs?.otGoals,
        playShootingPctg: playerStats.careerTotals.playoffs?.shootingPctg,
        playPlusMinus: playerStats.careerTotals.playoffs?.plusMinus,
        playTimeOnIce: playerStats.careerTotals.playoffs?.avgToi,
        // GOALIE
        playSavePctg: playerStats.careerTotals.playoffs?.savePctg,
        playShutouts: playerStats.careerTotals.playoffs?.shutouts,
        playGoalsAgainst: playerStats.careerTotals.playoffs?.goalsAgainst,
        playGoalsAgainstAvg: playerStats.careerTotals.playoffs?.goalsAgainstAvg,
        playShotsAgainst: playerStats.careerTotals.playoffs?.shotsAgainst,        
        
    };    
    return player;    
}

const playerData = await fetchPlayerData(8466139);

console.log(playerData);

// TODO:

// 1. careerTotals itself can be undefined — optional chaining after it doesn't protect the access to it, will throw on no-career-games players
// 2. This function currently does fetch + normalize in one step — decide if that's intentional or should split into two functions
// 3. avgToi isn't run through convertTimeOnIce — raw "MM:SS" string being assigned to a field typed number | null
// 4. Optional chaining produces undefined on a broken chain, but the interface declares number | null — type/value mismatch
// 5. No guard for fetchData returning undefined on failure — playerStats.playerId would throw (same deferred gap as search function)