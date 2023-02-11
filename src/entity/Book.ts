import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToMany(() => Author, (author) => author.id, { eager : true , cascade : true })
    @JoinTable( { name : "book_author" })
    authors: Author[]

    @ManyToMany(() => Category, (cat) => cat.id , { eager : true , cascade : true })
    @JoinTable( { name : "book_category" })
    categories : Category[]

    @ManyToOne(() => Language, language => language.id)
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