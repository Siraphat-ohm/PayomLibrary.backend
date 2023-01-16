import express from "express";
import corsOptions from "./config/corsOptions";
import { AppDataSource } from "./data-source";
import cors from "cors";
import credentials from "./middleware/credentials";
import cookieParser from "cookie-parser";
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

app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

//routes
import login from "./routes/login";
import logout from "./routes/logout";
import upload from "./routes/upload";
import books from "./routes/api/book";
import register from "./routes/register";
import refresh from "./routes/auth";
import verifyRefreshToken from "./middleware/verityRefreshToken";
import verifyAcessToken from "./middleware/verifyAcessToken";

app.use('/login', login);

app.use('/auth/refresh', verifyRefreshToken, refresh)
app.use(verifyAcessToken);
app.use('/upload', upload);
app.use('/books', books);
app.use('/register', register);
app.use('/logout', logout);

const server = http.createServer(app)
const io = new socketio.Server(server, {
    cors: {
        origin : "http://127.0.0.1:5173",
        methods : ["GET", "POST"]
    }
})

io.on("connection", (socket) => {

    socket.on("disconnect", () => {
        //console.log("user disconnected")
    })

    socket.on("order", (arg) => {
        console.log(arg);
        
    })
})

server.listen(9999, ()=> {
    console.log('server start on port : 9999');
})