import { Router, Request, Response, NextFunction } from 'express';
import { hash, compare } from '../utils/hash';
import { generateAccessToken } from '../utils/token';
import { ApiError } from '../utils/common/ApiError';
import { HttpStatus } from '../utils/common/HttpStatusCode';
import prisma from '../utils/client';

const router = Router();

router.post('/register', async(req: Request, res: Response, next: NextFunction) => {
    try {

        const { username, password } = req.body;
        if ( !username || !password ) {
            throw new ApiError('Missing credentials', HttpStatus.BAD_REQUEST);
        }
        if ( password.length < 8 ) {
            throw new ApiError('Password must be at least 8 characters long', HttpStatus.BAD_REQUEST);
        }
        const foundUser = await prisma.user.findFirst({ where: { username } });
        if ( foundUser ) {
            throw new ApiError('Username already exists', HttpStatus.BAD_REQUEST);
        }
        await prisma.user.create({ data: { username, password: hash(password) } });

        res.sendStatus(HttpStatus.CREATED);

    } catch (e) {
        next(e);
    }
});

router.post('/login', async(req: Request, res: Response, next: NextFunction) => {
    try {

        const { username, password } = req.body;
        if ( !username || !password ) {
            throw new ApiError('Missing credentials', HttpStatus.BAD_REQUEST);
        }
        const foundUser = await prisma.user.findFirstOrThrow({ where: { username } });
        if ( !compare(password, foundUser.password) ) {
            throw new ApiError('Incorrect password', HttpStatus.BAD_REQUEST);
        }
        const userInfo = {
            username: foundUser.username,
            id: foundUser.id
        };

        const accessToken = generateAccessToken({ username, id: foundUser.id.toString() });
        res.status(HttpStatus.OK).json({ accessToken, userInfo });

    } catch (e) {
        next(e);
    }
});

export default router;