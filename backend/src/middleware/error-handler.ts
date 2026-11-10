import type { Request, Response, NextFunction } from 'express';

function isPgError(err: unknown): err is { code: string; constraint?: string } {
    return typeof err === 'object' && err !== null && 'code' in err;
}

// error handler must have 4 parameters
function errorHandler(err: Error, req: Request, res: Response, next:NextFunction): void {    
    console.error(err);
    // DUPLICATE CARD -> 23505: UNIQUE VIOLATION -> 409: CONFLICT
    if (isPgError(err) && err.code === '23505') {                        
        res.status(409).json({error: 'Player already exists'});
        return;
    }
    // NO NHL RECORD -> 23502: NOT NULL VIOLATION -> 422: UNPROCESSABLE ENTITY
    if (isPgError(err) && err.code === '23502') {                        
        res.status(422).json({error: 'Player has no NHL record'});
        return;
    }        
    res.status(500).json({error: "Oops! Something went wrong..."});
}

export default errorHandler;