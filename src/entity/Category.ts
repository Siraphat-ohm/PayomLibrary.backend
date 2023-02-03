import { BaseEntity , Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id : string

    @Column()
    name : string

}

export default Category