import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
    @JoinTable()
    authors: Author[]

    @ManyToMany(() => Category, (cat) => cat.id , { eager : true , cascade : true })
    @JoinTable()
    categories : Category[]

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