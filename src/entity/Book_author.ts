import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm"

@Entity()
export class Book_author extends BaseEntity{

    @PrimaryColumn()
    book_id: number

    @Column()
    author_id: number

}