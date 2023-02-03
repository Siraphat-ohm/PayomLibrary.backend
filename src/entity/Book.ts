import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author";
import { Language } from "./Language";

@Entity()
export class Book extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @ManyToMany(() => Author, (author) => author.id)
    authors: Author[]

    @Column('text')
    description: string

    @Column({ default: 1 })
    categoryId: number

    @ManyToOne(() => Language, language => language.id)
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