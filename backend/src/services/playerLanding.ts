import { fetchData, convertTimeOnIce } from "../utils/helpers.js";

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
        currentTeam: playerStats.fullTeamName?.default ?? null,
        
        // ** REGULAR SEASON **
        // SKATER
        regGamesPlayed: playerStats.careerTotals?.regularSeason?.gamesPlayed ?? null,
        regGoals: playerStats.careerTotals?.regularSeason?.goals ?? null,
        regAssists: playerStats.careerTotals?.regularSeason?.assists ?? null,
        regPoints: playerStats.careerTotals?.regularSeason?.points ?? null,
        regGameWinningGoals: playerStats.careerTotals?.regularSeason?.gameWinningGoals ?? null,
        regOtGoals: playerStats.careerTotals?.regularSeason?.otGoals ?? null,
        regShootingPctg: playerStats.careerTotals?.regularSeason?.shootingPctg ?? null,
        regPlusMinus: playerStats.careerTotals?.regularSeason?.plusMinus ?? null,
        regTimeOnIce: convertTimeOnIce(playerStats.careerTotals?.regularSeason?.avgToi) ?? null,
        // GOALIE
        regSavePctg: playerStats.careerTotals?.regularSeason?.savePctg ?? null,
        regShutouts: playerStats.careerTotals?.regularSeason?.shutouts ?? null,
        regGoalsAgainst: playerStats.careerTotals?.regularSeason?.goalsAgainst ?? null,
        regGoalsAgainstAvg: playerStats.careerTotals?.regularSeason?.goalsAgainstAvg ?? null,
        regShotsAgainst: playerStats.careerTotals?.regularSeason?.shotsAgainst ?? null,
        
        // ** PLAYOFFS **
        // SKATER
        playGamesPlayed: playerStats.careerTotals?.playoffs?.gamesPlayed ?? null,
        playGoals: playerStats.careerTotals?.playoffs?.goals ?? null,
        playAssists: playerStats.careerTotals?.playoffs?.assists ?? null,
        playPoints: playerStats.careerTotals?.playoffs?.points ?? null,
        playGameWinningGoals: playerStats.careerTotals?.playoffs?.gameWinningGoals ?? null,
        playOtGoals: playerStats.careerTotals?.playoffs?.otGoals ?? null,
        playShootingPctg: playerStats.careerTotals?.playoffs?.shootingPctg ?? null,
        playPlusMinus: playerStats.careerTotals?.playoffs?.plusMinus ?? null,
        playTimeOnIce: convertTimeOnIce(playerStats.careerTotals?.playoffs?.avgToi) ?? null,
        // GOALIE
        playSavePctg: playerStats.careerTotals?.playoffs?.savePctg ?? null,
        playShutouts: playerStats.careerTotals?.playoffs?.shutouts ?? null,
        playGoalsAgainst: playerStats.careerTotals?.playoffs?.goalsAgainst ?? null,
        playGoalsAgainstAvg: playerStats.careerTotals?.playoffs?.goalsAgainstAvg ?? null,
        playShotsAgainst: playerStats.careerTotals?.playoffs?.shotsAgainst ?? null,        
        
    };    
    return player;    
}

const playerData = await fetchPlayerData(8466139);

console.log(playerData);

// TODO:

// 2. normalization on this step too?
// 5. No guard for fetchData returning undefined on failure — playerStats.playerId would throw (same deferred gap as search function)
