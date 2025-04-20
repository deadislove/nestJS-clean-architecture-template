import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserTypeOrmEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    email:string
}