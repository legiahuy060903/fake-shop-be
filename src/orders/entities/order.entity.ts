
import { UsersEntity } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'orders' })
export class OrdersEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UsersEntity, user => user.orders)
    user: UsersEntity;

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

