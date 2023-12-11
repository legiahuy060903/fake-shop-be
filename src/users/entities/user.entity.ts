import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Orders } from 'src/orders/entities/order.entity';
@Entity({ name: 'users' })
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    avatar: string;

    @Column()
    address: string;

    @Column({ type: "enum", enum: ['R1', 'R2'], default: 'R1' })
    role: 'R1' | 'R2';

    @Column()
    gender: string;

    @Column()
    refreshToken: string

    @OneToMany(() => Orders, order => order.user)
    orders: Orders[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

