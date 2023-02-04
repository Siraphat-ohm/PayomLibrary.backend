import dayjs from 'dayjs'
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";
import { Loan } from "./Loan";

@Entity()
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToMany(() => Book, (book) => book.id , { eager : true })
    @JoinTable()
    books : Book[]

    @OneToOne(() => User , (u) => u.id )
    @JoinColumn()
    user: User

    @Column({ default : false })
    approve : boolean

    async DoApprove() {

        const loan = Loan.create({
            order : this,
            //loanDate : dayjs().toDate(), 
            expectDate : dayjs().add(7 , 'day').toDate()
        })
        
        this.approve = true        
        await this.save()

        return  await loan.save()
    }

}
