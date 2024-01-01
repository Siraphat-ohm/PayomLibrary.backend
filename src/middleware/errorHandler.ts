import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/common/ApiError';
import { HttpStatus } from '../utils/common/HttpStatusCode';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if ( res.headersSent ) {
        return next(err)
    }

    if ( err instanceof ApiError ) {
        res.status(err.httpCode).json({ error: err.message });
        if ( err.errors ) {
            console.log(err.errors);
        }
        return;
    }

    console.log(err);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
}

export default errorHandler;