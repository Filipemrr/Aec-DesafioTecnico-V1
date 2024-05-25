import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AddressEntity } from '../addressEntity/address.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @OneToMany(() => AddressEntity, (address) => address.user, { cascade: true })
    public addresses: AddressEntity[];

    @Column({ nullable: true })
    public refreshToken: string;
}