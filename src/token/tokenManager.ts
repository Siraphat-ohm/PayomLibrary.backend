import jwt from 'jsonwebtoken';
import { AuthPayload } from '../types/types';

class TokenManager {
    
    public AuthPayload : AuthPayload

    protected accessToken : string;
    protected refreshToken : string 

    constructor(AuthPayload : AuthPayload){
        this.AuthPayload = AuthPayload;
    }

    generateAcessToken(){
        this.accessToken = jwt.sign(this.AuthPayload, process.env.SECRET_KEY_ACESS, { expiresIn: "1d" });
        return this.accessToken;
    }

    generateRefreshToken(){
        this.refreshToken = jwt.sign(this.AuthPayload, process.env.SECRET_KEY_REFRESH, { expiresIn : "1d" });
        return this.refreshToken
    }

}

export default TokenManager;