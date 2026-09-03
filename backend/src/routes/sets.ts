import { Router } from "express";
import type { Request,Response } from "express";
import {createSet, getSets} from "../services/sets.js";

const router = Router();

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

export default router;