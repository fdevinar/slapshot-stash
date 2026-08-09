import type { Request, Response, NextFunction } from 'express';

// error handler must have 4 parameters
function errorHandler(err: Error, req: Request, res: Response, next:NextFunction): void {
    console.error(err);
    res.status(500).json({error: "Oops! Something went wrong..."});
}

export default errorHandler;