import jwt from 'jsonwebtoken';
import { payload } from '../types/types';

class TokenManager {
    
    public payload : payload

    protected accessToken : string;
    protected refreshToken : string 

    constructor(payload : payload){
        this.payload = payload;
    }

    generateAcessToken(){
        this.accessToken = jwt.sign(this.payload, process.env.SECRET_KEY_ACESS, { expiresIn: "3m" });
        return this.accessToken;
    }

    generateRefreshToken(){
        this.refreshToken = jwt.sign(this.payload, process.env.SECRET_KEY_REFRESH, { expiresIn : "1d" });
        return this.refreshToken
    }

}

export default TokenManager;