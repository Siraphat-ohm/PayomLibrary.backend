import express from "express";
import corsOptions from "./config/corsOptions";
import { AppDataSource } from "./data-source";
import cors from "cors";
import credentials from "./middleware/credentials";
import cookieParser from "cookie-parser";
import session = require("express-session");

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
app.use(session({
    secret: "test",
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: false
}))
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

//routes
import login from "./routes/login";
import logout from "./routes/logout";
import auth from "./routes/auth";
import upload from "./routes/upload";

app.use('/login', login);
app.use('/logout', logout);
app.use('/auth', auth);
app.use('/upload', upload);


app.listen(9999, () => {
    console.log("server start port : 9999");
})