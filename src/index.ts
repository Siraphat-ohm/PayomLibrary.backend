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
    socket.on("order", async(arg) => {
        try {
            const books = []
            for ( let order of arg ) { 
                try {
                    const book = await Book.findOneOrFail( { where : { copies : MoreThanOrEqual(order.amount), id: order.id } } );
                    books.push(book);
                } catch (error) {
                    console.log("fuck");
                    return;
                }
            }

            const order = new Order();
            order.bookOrders = books;
            order.userId = arg[0].userId;
            await Order.save(order);

            const orders = await Order.find( { relations: { bookOrders: true } } )
            console.log(orders);
            socket.emit("send-order", orders);


            // for ( let book of books ) {
                // try {
                    // const bookUpdate = new BookOrder();
                    // bookUpdate.ISBN = book.ISBN;
                    // bookUpdate.amount = 1;
                    // bookUpdate.title = book.title;
                    // bookUpdate.bookId = book.id
                    // await BookOrder.save(bookUpdate);
                    // book.copies--;
                    // await book.save()
                    // console.log('yay');
                // } catch (error) {
                    // console.log(error);
                // }
            // }

        } catch (error) {
            console.log(error);
        }
    })
})

server.listen(4662, ()=> {
    console.log('server start on port : 4662');
})