import fs from 'node:fs';

// PLAYER LIST
const printArray = new Array();
const playerArray = [
    'Connor McDavid',
    'Jake Oettinger',
    'Jacob Trouba',
    'Martin Brodeur',    
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
        console.log(`Expected exactly one match, got ${playerData.total}`);
        return;
    }
    
    const playerId = playerData.data[0].id;
    const playerUrl = `https://api-web.nhle.com/v1/player/${playerId}/landing`;
    const playerStats = await fetchData(playerUrl);

    const player = {
        firstName: playerStats.firstName.default,
        lastName: playerStats.lastName.default,
        position: playerStats.position,        
        birthCountry: playerStats.birthCountry,
        isActive: playerStats.isActive,
        currentTeam: playerStats.fullTeamName?.default,
        // CAREER TOTALS
        regularSeason: {
            // SKATER
            gamesPlayed: playerStats.careerTotals.regularSeason.gamesPlayed,
            goals: playerStats.careerTotals.regularSeason.goals,
            assists: playerStats.careerTotals.regularSeason.assists,
            points: playerStats.careerTotals.regularSeason.points,
            gameWinningGoals: playerStats.careerTotals.regularSeason.gameWinningGoals,
            otGoals: playerStats.careerTotals.regularSeason.otGoals,
            shootingPctg: playerStats.careerTotals.regularSeason.shootingPctg,
            plusMinus: playerStats.careerTotals.regularSeason.plusMinus,
            timeOnIce: playerStats.careerTotals.regularSeason.avgToi,               
            // GOALIE  
            savePctg: playerStats.careerTotals.regularSeason.savePctg,
            shutouts: playerStats.careerTotals.regularSeason.shutouts,
            goalsAgainst: playerStats.careerTotals.regularSeason.goalsAgainst,
            goalsAgainstAvg: playerStats.careerTotals.regularSeason.goalsAgainstAvg,
            shotsAgainst: playerStats.careerTotals.regularSeason.shotsAgainst,            
        },
        playoffs: {
            // SKATER
            gamesPlayed: playerStats.careerTotals.playoffs.gamesPlayed,
            goals: playerStats.careerTotals.playoffs.goals,
            assists: playerStats.careerTotals.playoffs.assists,
            points: playerStats.careerTotals.playoffs.points,
            gameWinningGoals: playerStats.careerTotals.playoffs.gameWinningGoals,
            otGoals: playerStats.careerTotals.playoffs.otGoals,
            shootingPctg: playerStats.careerTotals.playoffs.shootingPctg,
            plusMinus: playerStats.careerTotals.playoffs.plusMinus,    
            timeOnIce: playerStats.careerTotals.playoffs.avgToi,               
            // GOALIE  
            savePctg: playerStats.careerTotals.playoffs.savePctg,
            shutouts: playerStats.careerTotals.playoffs.shutouts,
            goalsAgainst: playerStats.careerTotals.playoffs.goalsAgainst,
            goalsAgainstAvg: playerStats.careerTotals.playoffs.goalsAgainstAvg,
            shotsAgainst: playerStats.careerTotals.playoffs.shotsAgainst,          
        }
    };
    
    printArray.push(player);            
    // fs.writeFileSync('player-output.json', JSON.stringify(player, null, 2));    
    // fs.writeFileSync('player-output.json', JSON.stringify(playerStats, null, 2));
}

// RUN
cyclePlayers();