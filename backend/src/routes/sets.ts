import { Router } from "express";
import type { Request,Response } from "express";
import createSet from "../services/sets.js";

const router = Router();

router.post('/',(req: Request, res: Response) => {
    const name = req.body.name;
    console.log(name);

    res.json({ message: name });

});

export default router;