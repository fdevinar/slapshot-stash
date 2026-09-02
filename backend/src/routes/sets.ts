import { Router } from "express";
import type { Request,Response } from "express";
import createSet from "../services/sets.js";

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

export default router;