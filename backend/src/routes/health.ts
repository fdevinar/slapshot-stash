import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Ok' });
    // throw new Error('Test error for error handler');
});

export default router;