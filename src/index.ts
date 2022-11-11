import express from "express";
import { Request, Response } from "express";
import corsOptions from "./config/corsOptions";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import cors from "cors";
import credentials from "./middleware/credentials";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

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
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

//middleware


app.post('/login', async(req: Request, res: Response, next:Function) => {
    let { user, pwd } = req.body;
    try {
        let foundUser = await User.find({
                                    where: { userName:req.body.user }
                                })
        if (foundUser[0].userName == user && await bcrypt.compareSync(pwd, foundUser[0].passWord)) {
            let data = {
                id_user : foundUser[0].id,
                user : foundUser[0].userName,
            }
            res.cookie("auth", data, {
                                httpOnly:false, sameSite:'Lax', secure:false, maxAge: 24 * 60 * 60 * 1000 
                            }).json({"message":"ok"})
        };
    } catch (error) {
       next(error); 
    }
})

app.get('/logout',async (req: Request, res: Response, next: Function) => {
    const cookies = req.cookie;
    if (!cookies?.auth) return res.sendStatus(204);

    res.clearCookie("auth");
    res.end();
})

app.post('/register', async(req: Request, res: Response, next: Function) => {
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