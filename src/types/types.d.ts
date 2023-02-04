import { Request } from "express"

export type payload  = { 
    user: string,
    role: number
}

type Payload =  { user? : string , role? : number , token? : string } 
// declare module "express" {
declare global {
    namespace Express {
        interface Request extends Payload {}
    }
}