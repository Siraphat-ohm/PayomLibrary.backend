import express from "express";

const createServer = () => { 
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    return app;
}

export default createServer;