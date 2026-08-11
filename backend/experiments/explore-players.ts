import fs from 'node:fs';

const firstName = 'Patrick';
const lastName = 'Marleau';

// const firstName = 'Sidney';
// const lastName = 'Crosby';

const reqString = `https://api.nhle.com/stats/rest/en/players?cayenneExp=firstName%20likeIgnoreCase%20'%${firstName}%'%20and%20lastName%20likeIgnoreCase%20'%${lastName}%'`;

// TODO: DRY AND GOALIE

async function fetchData() {
    try {
        const basicResponse = await fetch(reqString);

        if(!basicResponse.ok) {
            console.log(`Error: ${basicResponse.status}`);
            return;
        }

        const basicData = await basicResponse.json();
        console.log(basicData);
        
        const playerId = basicData.data[0].id;
        const playerUrl = `https://api-web.nhle.com/v1/player/${playerId}/landing`;
                            
        const playerResponse = await fetch (playerUrl);

        if(!playerResponse.ok) {
            console.log(`Error: ${playerResponse.status}`);
            return;
        }

        const playerData = await playerResponse.json();
        console.log(playerData.featuredStats);

        fs.writeFileSync('player-output.json', JSON.stringify(playerData, null, 2));


    }
    catch (error) {
        console.log(error);        
    }
}

fetchData();