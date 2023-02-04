import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/types";


const verifyAcessToken = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.SECRET_KEY_ACESS,
    (err: Error, decode:  AuthPayload ) => {
      if (err) {
        console.error(err);
        return res.sendStatus(403);
      }
      req.userId = decode.userId;
      req.userRole = decode.userRole;
      next();
    }
  );
};

export default verifyAcessToken;
