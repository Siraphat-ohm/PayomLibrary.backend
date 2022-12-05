import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Member_status extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    staus_value: string

}