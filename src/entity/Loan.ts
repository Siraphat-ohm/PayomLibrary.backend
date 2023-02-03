import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";


@Entity()
export class Loan extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => Order)
    order: Order

    @CreateDateColumn()
    loanDate: Date

    @Column('date')
    expectDate: Date

    @Column('date', { nullable: true } )
    returnDate: Date

}