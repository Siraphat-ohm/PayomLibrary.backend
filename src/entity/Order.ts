import dayjs from 'dayjs'
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Tree } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";
import { Loan } from "./Loan";

@Entity()
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToMany(() => Book, (book) => book.id, { cascade: true } )
    @JoinTable()
    books : Book[]

    @OneToOne(() => User , (u) => u.id, { cascade: true }  )
    @JoinColumn()
    user: User

    @Column({ default : false })
    approve : boolean

    async DoApprove(userId: string) {

        const loan = Loan.create({
            order : this,
            //loanDate : dayjs().toDate(), 
            expectDate : dayjs().add(7 , 'day').toDate()
        })

        await User.update(userId, { isLoan: true })
        
        this.approve = true        
        await this.save()

        return  await loan.save()
    }

    async DoDiscard() {
        return await Order.delete(this.id);
    }

}
