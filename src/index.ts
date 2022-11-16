import express from "express";
import { Request, Response } from "express";
import corsOptions from "./config/corsOptions";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import cors from "cors";
import credentials from "./middleware/credentials";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import sessions = require("express-session");

AppDataSource
    .initialize()
    .then(() => {
        console.log('initalized!');
    })
    .catch((err) => {
        console.log("Error initalize", err);
    })

const app = express();

//config
app.use(sessions({
    secret: "test",
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: false
}))
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

app.post('/register', async(req: Request, res: Response, next: Function) => {
    let { user, pwd } = req.body;
    try {
        let pwdHash:string = bcrypt.hashSync(pwd, 10);
        await User.insert({ userName:user, passWord:pwdHash });
        res.sendStatus(200);
    } catch (error) {
       next(error); 
    }
})

app.get('/',async(req:Request, res:Response, next:Function) => {
    console.log(session);
    res.status(200).json({"message":"I think I am Ok. :("});
    
})

app.listen(9999, () => {
    console.log("server start port : 9999");
})