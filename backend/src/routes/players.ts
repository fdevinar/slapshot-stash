import { Router } from "express";
import type { Request, Response } from "express";
import { fetchPlayerId } from '../services/playerSearch.js';
import { fetchPlayerData } from '../services/playerLanding.js';
// import { upsertPlayer } from '../services/playerCache.js';

const router = Router();

interface UserRouteParams {
    id: string;
}

router.get('/search', async (req: Request, res: Response) => {    
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    if (!firstName || !lastName ) {
        return res.status(400).json({error: 'First and last names are required'});
        
    }
    if (typeof firstName !== 'string' || typeof lastName !== 'string') {
        return res.status(400).json({error: 'Parameters need to be a text string'});
    }
    const playerList = await fetchPlayerId(firstName,lastName);    
    res.status(200).json(playerList);
});
router.get('/:id', async (req: Request<UserRouteParams>, res: Response) => {
    const playerId = parseInt(req.params.id, 10);
    if (isNaN(playerId)) {
        return res.status(400).json({error: 'ID must be a valid number'});        
    }
    const playerData = await fetchPlayerData(playerId);
    if (!playerData) {
        return res.status(404).json({error: 'Player not found'});        
    }    
    console.log(playerData);

    // console.log("DB UPSERT TRY...");
    // upsertPlayer(playerData);



    res.status(200).json(playerData);    
});


export default router;