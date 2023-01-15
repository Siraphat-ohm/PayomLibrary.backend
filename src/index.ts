import express from "express";
import corsOptions from "./config/corsOptions";
import { AppDataSource } from "./data-source";
import cors from "cors";
import credentials from "./middleware/credentials";
import cookieParser from "cookie-parser";
import session = require("express-session");
import * as http from "http";
import * as socketio from "socket.io";


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
import books from "./routes/api/book";
import register from "./routes/register";

app.use('/login', login);
app.use('/logout', logout);
app.use('/auth', auth);
app.use('/upload', upload);
app.use('/books', books);
app.use('/register', register);

const server = http.createServer(app)
const io = new socketio.Server(server, {
    cors: {
        origin : "http://127.0.0.1:5173",
        methods : ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected")
    })

    socket.on("order", (arg) => {
        console.log(arg);
        
    })
})

server.listen(9999, ()=> {
    console.log('server start on port : 9999');
})