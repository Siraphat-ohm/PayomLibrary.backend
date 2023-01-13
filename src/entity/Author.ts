import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Author extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
    author_id: number

    @Column()
    name: string

}