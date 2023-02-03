import { DataSource } from "typeorm"
import { Author } from "./entity/Author"
import { Book } from "./entity/Book"

import dotenv from "dotenv"
import { User } from "./entity/User"
import { Language } from "./entity/Language"
import { Order } from "./entity/Order"
import { Loan } from "./entity/Loan"
import Category from "./entity/Category"
dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
    synchronize: true,
    logging: false,
    entities: [Book, Author, User, Language, Order, Loan , Category],
    migrations: [],
    subscribers: [],
})
