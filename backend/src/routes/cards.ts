import { Router } from "express";
import type { Request, Response } from "express";
import { createCard, getCards } from '../services/cards.js';

const router = Router();

// interface UserRouteParams {
//     playerId: string;
//     setId: string;
// }

router.post('/', async (req: Request, res: Response) => {    
    const playerId = req.body.playerId;
    if (typeof playerId !== 'number') {
        return res.status(400).json({error: 'Player ID must be a valid number'});
    }
    
    const setId = req.body.setId;
    if (typeof setId !== 'number') {
        return res.status(400).json({error: 'Set ID must be a valid number'});
    }
    const newCard = await createCard(playerId, setId);
    console.log(newCard);
    res.status(201).json(newCard);
});
router.get('/', async (req: Request, res: Response) => {
    const allCards = await getCards();
    console.log(allCards);
    res.status(200).json(allCards);
})


export default router;