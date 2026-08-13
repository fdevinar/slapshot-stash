import fs from 'node:fs';

// PLAYER LIST
const printArray = new Array();
const playerArray = [
    'Connor McDavid',
    'Jake Oettinger',
    'Jacob Trouba',
    'Martin Brodeur',   
    'Bobby Orr', 
    'Robert Orr', 
    'Guy Charron', 
    'Macklin Celebrini',
]

// CYCLE PLAYER LIST
async function cyclePlayers() {
    for (const player of playerArray) {
        const splitPlayer = player.split(" ");
        const firstName = splitPlayer[0];
        const lastName = splitPlayer[1];
        
        if (typeof firstName === 'string' && typeof lastName === 'string') {
            await fetchPlayer(firstName,lastName);                       
        }
    };        
    fs.writeFileSync('player-list-output.json', JSON.stringify(printArray, null, 2));    
}

// GENERIC FETCH DATA
async function fetchData(url: string) {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            console.log(`Error: ${response.status}`);     
            return;       
        }
        const data = await response.json();                                
        return data;
    }
    catch (error) {
        console.log(error);        
    }
}

// FETCH PLAYER FROM NHL API
async function fetchPlayer(firstName: string, lastName: string) {
    const reqString = `https://api.nhle.com/stats/rest/en/players?cayenneExp=firstName%20likeIgnoreCase%20'%${firstName}%'%20and%20lastName%20likeIgnoreCase%20'%${lastName}%'`;
    const playerData = await fetchData(reqString);        
    
    if (!playerData || playerData.total !== 1) {
        console.log(`Expected exactly one match, got ${playerData?.total ?? 0}`);
        return;
    }
    console.log(playerData.data[0].lastName);
    console.log(playerData.data[0].id);
    
    const playerId = playerData.data[0].id;
    const playerUrl = `https://api-web.nhle.com/v1/player/${playerId}/landing`;
    const playerStats = await fetchData(playerUrl);

    const basicStats = {
        firstName: playerStats.firstName.default,
        lastName: playerStats.lastName.default,
        position: playerStats.position,        
        birthCountry: playerStats.birthCountry,
        isActive: playerStats.isActive,
        currentTeam: playerStats.fullTeamName?.default,
    }
    
    const regularSeasonStats = playerStats.careerTotals?.regularSeason;
    const playoffsStats = playerStats.careerTotals?.playoffs;
    
    const player = {
        basicStats,
        // CAREER TOTALS        
        regularSeason: regularSeasonStats ? {
            // SKATER
            gamesPlayed: regularSeasonStats.gamesPlayed,
            goals: regularSeasonStats.goals,
            assists: regularSeasonStats.assists,
            points: regularSeasonStats.points,
            gameWinningGoals: regularSeasonStats.gameWinningGoals,
            otGoals: regularSeasonStats.otGoals,
            shootingPctg: regularSeasonStats.shootingPctg,
            plusMinus: regularSeasonStats.plusMinus,
            timeOnIce: regularSeasonStats.avgToi,               
            // GOALIE  
            savePctg: regularSeasonStats.savePctg,
            shutouts: regularSeasonStats.shutouts,
            goalsAgainst: regularSeasonStats.goalsAgainst,
            goalsAgainstAvg: regularSeasonStats.goalsAgainstAvg,
            shotsAgainst: regularSeasonStats.shotsAgainst,            
        } : null,
        playoffs: playoffsStats ? {
            // SKATER
            gamesPlayed: playoffsStats.gamesPlayed,
            goals: playoffsStats.goals,
            assists: playoffsStats.assists,
            points: playoffsStats.points,
            gameWinningGoals: playoffsStats.gameWinningGoals,
            otGoals: playoffsStats.otGoals,
            shootingPctg: playoffsStats.shootingPctg,
            plusMinus: playoffsStats.plusMinus,    
            timeOnIce: playoffsStats.avgToi,               
            // GOALIE  
            savePctg: playoffsStats.savePctg,
            shutouts: playoffsStats.shutouts,
            goalsAgainst: playoffsStats.goalsAgainst,
            goalsAgainstAvg: playoffsStats.goalsAgainstAvg,
            shotsAgainst: playoffsStats.shotsAgainst,          
        } : null,
    };
    
    printArray.push(player);            
    // fs.writeFileSync('player-output.json', JSON.stringify(player, null, 2));    
    // fs.writeFileSync('player-output.json', JSON.stringify(playerStats, null, 2));
}

// RUN
cyclePlayers();