import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";


@Entity()
export class Author extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    fname: string

    @Column()
    lname: string

    @ManyToOne(() => Book, (book) => book.authors)
    book: Book

}