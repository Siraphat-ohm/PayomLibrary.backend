import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";


@Entity()
export class Language extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    language: string

    @OneToOne(() => Book, book => book.language)
    book: Book

}