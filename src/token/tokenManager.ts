import jwt from 'jsonwebtoken';
import { payload } from '../types/types';

class TokenManager {
    
    public payload : payload

    protected accessToken : string;
    protected refreshToken : string 

    protected invalidRefreshToken : Array<string>  = []
    
    constructor(payload : payload){
        this.payload = payload;
    }

    generateAcessToken(){
        this.accessToken = jwt.sign(this.payload, process.env.SECRET_KEY_ACESS);
        return this.accessToken;
    }

    generateRefreshToken(){
        this.refreshToken = jwt.sign(this.payload, process.env.SECRET_KEY_REFRESH);
        return this.refreshToken
    }

    validRefreshToken(refreshToken : string){
        return this.invalidRefreshToken.includes(refreshToken)
    }

    invalidToken(refreshToken){
        this.invalidRefreshToken.push(refreshToken)
    }

}

export default TokenManager;