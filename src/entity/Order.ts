import dayjs from 'dayjs'
import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";
import { Loan } from "./Loan";

@Entity()
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToMany(() => Book, (book) => book.id)
    books : Book[]

    @OneToOne(() => User)
    user: User

    @Column({ default : false })
    approve : boolean

    async DoApprove() {

        const loan = Loan.create({
            order : this,
            expectDate : dayjs().add(7 , 'day')
        })
        
        this.approve = true        
        await this.save()

        return await loan.save()
    }

}
