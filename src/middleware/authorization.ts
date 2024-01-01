import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/common/ApiError";
import { HttpStatus } from "../utils/common/HttpStatusCode";
import { Role } from "@prisma/client";

const authorization = (roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const role = req.payload.role;
            if (!roles.includes(role)) {
                throw new ApiError("Forbidden", HttpStatus.FORBIDDEN);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export default authorization;