
import { Users } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class Orders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(() => Users, user => user.orders)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: Users;

    @Column()
    status: number;

    @Column({ type: "enum", enum: ['bank', 'cash'], default: 'cash', nullable: false })
    paymentGateway: 'bank' | 'cash';

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    name: string;

    @Column()
    total: string;

    @Column({ type: "enum", enum: ['unpaid', 'paid'], default: 'unpaid', nullable: false })
    payment: 'unpaid' | 'paid';

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

