import { BaseEntity, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Entity()
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToMany(() => Book, (book) => book.id)
    books : Book[]

    @OneToOne(() => User)
    user: User

}