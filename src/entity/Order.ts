import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";


@Entity()
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => Book, { onDelete:"RESTRICT", onUpdate:"RESTRICT", cascade:false})
    @JoinColumn()
    books: Book

    @Column()
    amount: number

    @Column()
    userId: string

}