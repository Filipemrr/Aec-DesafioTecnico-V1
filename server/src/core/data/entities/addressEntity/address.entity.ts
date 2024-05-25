import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../userEntity/user.entity';

@Entity('address')
export class AddressEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => UserEntity, (user) => user.addresses)
    @JoinColumn({ name: 'userId' })
    public user: UserEntity;

    @Column()
    public cep: string;

    @Column()
    public logradouro: string;

    @Column({ nullable: true })
    public complemento: string;

    @Column()
    public bairro: string;

    @Column()
    public cidade: string;

    @Column()
    public uf: string;

    @Column()
    public numero: string;

}