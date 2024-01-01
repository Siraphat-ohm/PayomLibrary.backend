import jwt from 'jsonwebtoken';
import { UserPayload } from '../interfaces/UserPayload';
import { ApiError } from './common/ApiError';
import { HttpStatus } from './common/HttpStatusCode';

const generateAccessToken = (payload: UserPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });
}

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    } catch (e) {
        throw new ApiError("Invalid token", HttpStatus.UNAUTHORIZED);
    }
}

export { generateAccessToken, verifyToken };