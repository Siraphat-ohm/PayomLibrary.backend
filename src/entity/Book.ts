import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author";
import { Language } from "./Language";
import Category from "./Category";


@Entity()
export class Book extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column('text')
    description: string

    @ManyToMany(() => Author, (author) => author.id, { cascade : true, eager: true })
    @JoinTable( { name : "book_author" })
    authors: Author[]

    @ManyToMany(() => Category, (cat) => cat.id , { cascade : true, eager: true })
    @JoinTable( { name : "book_category" })
    categories : Category[]

    @ManyToOne(() => Language, language => language.id, { eager: true })
    @JoinColumn( { name: "book_language" })
    language: Language

    @Column()
    ISBN: string

    @Column()
    pubYear: number

    @Column()
    page: number

    @Column()
    copies: number

    @Column( { nullable: true } )
    thumbnail: string

}