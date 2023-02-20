import express, { Request, Response } from "express";
import corsOptions from "./config/corsOptions";
import { AppDataSource } from "./data-source";
import cors from "cors";
import credentials from "./middleware/credentials";
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

app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

//routes
import register from "./routes/admin/register";
import login from "./routes/login";
import logout from "./routes/logout";
import auth from "./routes/auth"
import refresh from "./routes/refresh";
import upload from "./routes/admin/upload";
import books from "./routes/client/api/book";
import order from './routes/order';
import recepit from "./routes/admin/reciept";

import verifyAcessToken from "./middleware/verifyAccessToken";

app.get("/hello", (req: Request, res: Response) => {
    res.json({
        'msg': 'hello'
    })
})

app.use('/api/upload', upload);
app.use('/api/refresh', refresh);
app.use('/api/auth', auth);
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/logout', logout);
app.use('/api/system-login', login);

app.use(verifyAcessToken);
app.use('/api/order', order);
app.use('/api/books', books);
app.use('/api/receipt', recepit);

app.listen(4662, ()=> {
    console.log('server start on port : 4662' );
})