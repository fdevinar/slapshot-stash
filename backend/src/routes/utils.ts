import { Router } from "express";
import type { Request, Response } from "express";
import { deleteData } from '../services/utils.js';

const router = Router();

router.delete('/', async (req: Request, res: Response) => {    
    await deleteData();    
    res.status(204).end();
});

export default router;