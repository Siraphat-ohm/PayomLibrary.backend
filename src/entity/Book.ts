import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author";
import { Language } from "./Language";

@Entity()
export class Book extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @OneToMany(() => Author, (author) => author.book)
    authors: Author[]

    @Column('text')
    description: string

    @Column({ default: 1 })
    categoryId: number

    @OneToOne(() => Language, language => language.book)
    language: Language

    @Column()
    ISBN: string

    @Column()
    pubYear: string

    @Column()
    edition: number

    @Column()
    page: number

    @Column()
    copies: number

    @Column( { nullable: true } )
    graphic: string

}