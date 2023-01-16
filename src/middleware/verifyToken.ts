import jwt from 'jsonwebtoken'

type DecodeProps = {
    user: string
    role: number
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if ( authHeader ) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.SECRET_KEY_ACESS, (err:Error, decode: DecodeProps) => {
            if (err) {
                res.sendStatus(403);
            }

            req.user = decode.user;
            req.role = decode.role;

            next();
        })
    }
}