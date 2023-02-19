import dayjs from 'dayjs'
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Tree } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";
import { Loan } from "./Loan";

@Entity()
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToMany(() => Book, (book) => book.id, { cascade: true, eager: true } )
    @JoinTable()
    books : Book[]

    @OneToOne(() => User , (u) => u.id, { cascade: true, eager: true }  )
    @JoinColumn()
    user: User

    @Column({ default : false })
    approve : boolean

    async DoApprove() {
        const loan = Loan.create({
            order : this,
            loanDate : dayjs().format("YYYY-MM-DD"), 
            expectDate : dayjs().add(7 , 'day').format("YYYY-MM-DD")
        })

        await User.update(this.user.id, { isLoan: true })
        
        this.approve = true
        
        await this.save()

        return await loan.save()
    }

    async DoDiscard() {
        for (let book of this.books) {
            book.copies++
            await Book.save(book);
        }
        return this.remove()
    }

}
