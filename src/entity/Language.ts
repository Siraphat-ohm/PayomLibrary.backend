import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Language extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    language: string
}