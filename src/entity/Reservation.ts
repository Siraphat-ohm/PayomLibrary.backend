import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";


@Entity()
export class Reservation extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => User, user => user.id, {onUpdate:"RESTRICT"})
    userId: User

    @OneToOne(() => Book, book => book.id)
    bookId: Book

    @Column()
    amount: number

    @Column('date')
    loanDate: Date

    @Column('date')
    returnDate: Date

}