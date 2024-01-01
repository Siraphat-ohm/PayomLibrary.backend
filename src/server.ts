import express from "express";
import errorHandler from "./middleware/errorHandler";
import router from "./routes/user.route";

const createServer = () => { 
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api', router);
    app.use(errorHandler);
    return app;
}

export default createServer;