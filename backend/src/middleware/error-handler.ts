import type { Request, Response, NextFunction } from 'express';

function isPgError(err: unknown): err is { code: string; constraint?: string } {
    return typeof err === 'object' && err !== null && 'code' in err;
}


// error handler must have 4 parameters
function errorHandler(err: Error, req: Request, res: Response, next:NextFunction): void {    
    console.error(err);
    if (isPgError(err) && err.code === '23505') {                
        res.status(409).json({error: err});
        return;
    }
    res.status(500).json({error: "Oops! Something went wrong..."});
}

export default errorHandler;