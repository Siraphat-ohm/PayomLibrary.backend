import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Category extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    category_id: string

}