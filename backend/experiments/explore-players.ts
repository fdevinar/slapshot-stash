import fs from 'node:fs';

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
        currentTeam: playerStats.fullTeamName.default,        
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
            // GOALIE  
            savePctg: playerStats.careerTotals.playoffs.savePctg,
            shutouts: playerStats.careerTotals.playoffs.shutouts,
            goalsAgainst: playerStats.careerTotals.playoffs.goalsAgainst,
            goalsAgainstAvg: playerStats.careerTotals.playoffs.goalsAgainstAvg,
            shotsAgainst: playerStats.careerTotals.playoffs.shotsAgainst,          
        }
    };

    console.log(player);
    
    fs.writeFileSync('player-output.json', JSON.stringify(player, null, 2));
    
    // fs.writeFileSync('player-output.json', JSON.stringify(playerStats, null, 2));
}

fetchPlayer('Connor', 'McDavid');
// fetchPlayer('Jake', 'Oettinger');


// SKATER STATS
// careerTotals -> regularSeason/playoffs
// gamesPlayed
// goals
// assists
// points
// gameWinningGoals
// otGoals
// shootingPctg
// plusMinus

// GOALIE STATS
// careerTotals -> regularSeason/playoffs
// gamesPlayed
// savePctg
// shutouts
// goalsAgainst
// goalsAgainstAvg
// shotsAgainst