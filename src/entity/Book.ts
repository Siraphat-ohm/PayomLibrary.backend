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
    edition: string

    @Column()
    publication_year: string 

    @Column()
    copies_owned: string

    @Column()
    graphic: string

    @Column()
    language: string

    @Column()
    page:number

    @Column()
    ISBN: string

    @Column("text")
    detail: string

}