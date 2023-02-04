import { Request } from "express"

export type AuthPayload  = { 
    userId: string,
    userRole: number
}

type Payload =  AuthPayload & {  token? : string } 
// declare module "express" {
declare global {
    namespace Express {
        interface Request extends Payload {}
    }
}