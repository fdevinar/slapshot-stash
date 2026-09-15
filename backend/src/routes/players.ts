import { Router } from "express";
import type { Request, Response } from "express";
import { fetchPlayerId } from '../services/playerSearch.js';

const router = Router();

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

export default router;