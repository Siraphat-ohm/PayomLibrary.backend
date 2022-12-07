import { DataSource } from "typeorm"
import { Author } from "./entity/Author"
import { Book } from "./entity/Book"
import { Book_author } from "./entity/Book_author"
import { Category } from "./entity/Category"
import { Loan } from "./entity/Loan"
import { Member_status } from "./entity/Member_status"
import { Reservation } from "./entity/Reservation"
import { Reservation_status } from "./entity/Reservation_status"
import { User } from "./entity/User"

import dotenv from "dotenv"
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
    entities: [User, Book, Book_author, Author, Category, Loan, Member_status, Reservation, Reservation_status],
    migrations: [],
    subscribers: [],
})
