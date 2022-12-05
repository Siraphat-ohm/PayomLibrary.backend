import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Book_author extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
    book_id: number

    @Column()
    author_id: number

}