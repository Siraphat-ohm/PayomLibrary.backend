import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/common/ApiError';
import { verifyToken } from '../utils/token';
import prisma from '../utils/client';
import { HttpStatus } from '../utils/common/HttpStatusCode';

const authentication = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new ApiError("Missing Token", HttpStatus.UNAUTHORIZED);
        }
        const decoded = verifyToken(token);
        req.payload = decoded;

        const userId = req.payload.id;
        const user = await prisma.user.findUniqueOrThrow({ where: { id: Number(userId) } });
        
        if (!user) {
            throw new ApiError("Invalid user", HttpStatus.UNAUTHORIZED);
        }

        next();
    } catch (e) {
        next(e);
    }
}

export default authentication;