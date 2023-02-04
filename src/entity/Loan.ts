import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";


@Entity()
export class Loan extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => Order)
    @JoinColumn()
    order: Order

    @Column('date', { default : () => "CURRENT_DATE()" })
    loanDate: Date

    @Column('date')
    expectDate: Date

    @Column('date', { nullable: true } )
    returnDate: Date

}