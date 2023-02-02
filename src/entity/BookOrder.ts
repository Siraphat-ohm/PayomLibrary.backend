import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Book } from "./Book"
import { Order } from "./Order"

@Entity()
export class BookOrder extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    bookId: string

    @Column()
    book: Book

    @ManyToOne(() => Order, (order) => order.bookOrders)
    order : Order

}