import { Router } from "express";
import type { Request,Response } from "express";
import {createSet, getSets, getSetbyId} from "../services/sets.js";

const router = Router();

interface UserRouteParams {
    id: string;
}

router.post('/', async (req: Request, res: Response) => {
    const name = req.body.name;
    if (typeof name !== 'string' || name.trim() === '') {
        res.status(400).json({error: 'Name is required'});
        return;
    }
    const newSet = await createSet(name);
    console.log(newSet);
    res.status(201).json(newSet);    
});

router.get('/', async (req: Request, res: Response) => {    
    const allSets = await getSets();
    console.log(allSets);
    res.status(200).json(allSets);
});

router.get('/:id', async (req: Request<UserRouteParams>, res: Response) => {    
    const setId = parseInt(req.params.id, 10);
    if (isNaN(setId)) {
        res.status(400).json({error: 'ID must be a valid number'});
        return;
    }
    const set = await getSetbyId(setId);
    if (!set) {
        res.status(404).json({error: 'Set not found'});
    }
    console.log(set);
    res.status(200).json(set);
});

export default router;