import { UserPayload } from './src/interfaces/UserPayload';

declare global {
  namespace Express {
    export interface Request {
      payload: UserPayload;
    }
  }
}