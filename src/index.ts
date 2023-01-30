import express, { Request, Response } from "express";
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
import register from "./routes/admin/register";
import login from "./routes/login";
import logout from "./routes/logout";
import auth from "./routes/auth"
import refresh from "./routes/refresh";
import upload from "./routes/admin/upload";
import books from "./routes/client/api/book";
import order from "./routes/admin/order"

import { Book } from "./entity/Book";
import { Author } from "./entity/Author";
import verifyAcessToken from "./middleware/verifyAccessToken";
import { Order } from "./entity/Order";
import { User } from "./entity/User";

app.use('/api/refresh', refresh);
app.use('/api/auth', auth);
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/logout', logout);
app.use('/api/system-login', login);

app.use(verifyAcessToken);
app.use('/api/upload', upload);
app.use('/api/books', books);
app.use('/api/getOrder', order);

app.get("/book", async(req:Request, res:Response) => {
    const data = await Book.find({ relations : { authors: true }})
    const author = await Author.find()
    res.json({data, author}).status(200);
})

const server = http.createServer(app)
const io = new socketio.Server(server, {
    cors: {
        origin : "*",
        methods : ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.on("order", async(arg) => {
        for (let order of arg) {
            let foundUser = await User.find( { where : { id:order.userId }} )
            if (foundUser.length == 0 ) return 
            if (!foundUser[0].isLoan) {
                try {
                    let orders = new Order()
                    let book = await Book.find( { where: { id: order.id } } )
                    orders.books = book[0];
                    orders.amount = order.amount;
                    orders.userId = order.userId;
                    await Order.save(orders)
                    await User.update({id: order.userId }, { isLoan : true } )
                } catch (error) {
                    console.log(error);
                }
            } else {
                break
            }
        }
        const data = await Order.find({relations: { books:true}, select: { books: { title:true, ISBN:true }}})
        await socket.broadcast.emit("send-order", data)
        
    })
})

server.listen(4662, ()=> {
    console.log('server start on port : 4662');
})