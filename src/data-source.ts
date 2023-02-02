import { DataSource } from "typeorm"
import { Author } from "./entity/Author"
import { Book } from "./entity/Book"

import dotenv from "dotenv"
import { User } from "./entity/User"
import { Language } from "./entity/Language"
import { Order } from "./entity/Order"
import { Reservation } from "./entity/Reservation"
import { Loan } from "./entity/Loan"
import { BookOrder } from "./entity/BookOrder"
dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    synchronize: true,
    logging: false,
    entities: [Book, Author, User, Language, Order, Reservation, Loan, BookOrder],
    migrations: [],
    subscribers: [],
})
