import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

@Entity()
export class Loan extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => Order, { onDelete: 'CASCADE' })
    @JoinColumn()
    order: Order

    @Column({ default : () => "CURRENT_TIMESTAMP"})
    loanDate: Date

    @Column('date')
    expectDate: Date

    @Column('date', { nullable: true } )
    returnDate: Date

}