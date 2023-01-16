import jwt from 'jsonwebtoken';

export const generateAcessToken = (payload : Object) => {
    return jwt.sign(payload, process.env.SECRET_KEY_ACESS, { expiresIn: '15s' });
}

export const generateRefreshToken = (payload : Object) => {
    return jwt.sign(payload, process.env.SECRET_KEY_REFRESH);
}