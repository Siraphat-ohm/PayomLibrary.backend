import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import roles from "../config/roles.json";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    email: string

    @Column("text")
    password: string

    @Column( { default : roles.student } )
    role: number

    @Column({nullable: true})
    refreshToken: string

    @Column({ default: false })
    isLoan:boolean

}