import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Reservation_status extends BaseEntity{

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    status_value: number

}