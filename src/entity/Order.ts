import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookOrder } from "./BookOrder";

@Entity()
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToMany(() => BookOrder, (bookOrder) => bookOrder.order)
    bookOrders: BookOrder[]

    @Column()
    userId: string

}