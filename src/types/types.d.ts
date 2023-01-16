import { Request } from "express"

export type payload  = { 
    user: string,
    role: number
}

declare module "express" {
    export interface Request {
        user? : string
        role? : number
        token? : string
    }
}