import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Reservation extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    book_id: number

    @Column()
    member_id: number

    @Column()
    load_date: Date

    @Column()
    returned_date: Date

}