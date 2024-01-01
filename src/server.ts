import express from "express";
import errorHandler from "./middleware/errorHandler";
import { ApiError } from "./utils/common/ApiError";
import { HttpStatus } from "./utils/common/HttpStatusCode";

const createServer = () => { 
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.get('/', (req, res, next) => {
        try {
            throw new ApiError('Hello', HttpStatus.UNAUTHORIZED);
        } catch (e) {
            next(e);
        }
    });
    app.use(errorHandler);
    return app;
}

export default createServer;