import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Book } from "./Book"
import { Order } from "./Order"

@Entity()
export class BookOrder extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    bookId: string

    @OneToOne(() => Book)
    @JoinColumn()
    book: Book

    @ManyToOne(() => Order, (order) => order.bookOrders)
    order : Order

}