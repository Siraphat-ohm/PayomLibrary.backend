import express, { Request, Response } from "express";
import corsOptions from "./config/corsOptions";
import { AppDataSource } from "./data-source";
import cors from "cors";
import credentials from "./middleware/credentials";
import cookieParser from "cookie-parser";
import * as http from "http";
import * as socketio from "socket.io";

// hello from collab :)

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
import { BookOrder } from "./entity/BookOrder";
import { LessThan, LessThanOrEqual, MoreThanOrEqual, QueryBuilder } from "typeorm";

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
    let socketMap = {};
    

    socket.on('join', (room) => {
        socket.join(room);
        socketMap[socket.id] = room;
    });

    socket.on("order", async(arg) => {
        try {
            const booksId = []
            for ( let order of arg ) { 
                try {
                    const book = await Book.findOneOrFail( { where : { copies : MoreThanOrEqual(1), id: order.id } } );
                    booksId.push(order.id);
                } catch (error) {
                    io.to(socketMap[socket.id]).emit('order', "out of stock")
                    return;
                }
            }

            const books = []
            for ( let id of booksId ){
                try {
                    const bookQuery = await Book.findOne( { where : { id:id }})
                    const bookUpdate = new BookOrder();
                    bookUpdate.book = bookQuery;
                    bookUpdate.bookId = id
                    books.push(bookUpdate);
                    await BookOrder.save(bookUpdate);
                } catch(error) {
                    console.log(error);
                }
            }

            const orders = new Order();
            orders.bookOrders = books;
            orders.userId = arg[0].userId;
            await Order.save(orders);

            const data = await Order.find( { relations : { bookOrders : {
                book: true
            }}} )
            
                
        } catch (error) {
            console.log(error);
        }
    })

    socket.on("disconnect", (room) => {
        socketMap = {}
    })
})

server.listen(4662, ()=> {
    console.log('server start on port : 4662');
})
