import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Author extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
    book_id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

}