import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Book extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    title: string

    @Column()
    category_id: string 

    @Column()
    publication_date: Date

    @Column()
    copies_owned: string

}