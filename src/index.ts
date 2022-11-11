import express from "express";
import { Request, Response } from "express";
import corsOptions from "./config/corsOptions";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import cors from "cors";
import credentials from "./middleware/credentials";
import bcrypt from "bcrypt";

AppDataSource
    .initialize()
    .then(() => {
        console.log('initalized!');
    })
    .catch((err) => {
        console.log("Error initalize", err);
    })

const app = express();

app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));

app.post('/login', async(req: Request, res: Response, next:Function) => {
    let { user, pwd } = req.body;
    try {
        let foundUser = await User.find({
                                    where: { userName:req.body.user }
                                })
        if (foundUser[0].userName == req.body.user && await bcrypt.compareSync(pwd, foundUser[0].passWord)) res.status(200).json({"message":"login success"});
    } catch (error) {
       next(error); 
    }
})

app.post('/register', async(req: Request, res: Response, next:Function) => {
    let { user, pwd } = req.body;
    try {
        let pwdHash:string = bcrypt.hashSync(pwd, 10);
        console.log(pwdHash);
        await User.insert({ userName:user, passWord:pwdHash });
        res.sendStatus(200);
    } catch (error) {
       next(error); 
    }
})

app.get('/',async(req:Request, res:Response, next:Function) => {
    res.json({"message":"api is ok."})
})

app.listen(9999, () => {
    console.log("server start port : 9999");
})
