import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity, BeforeInsert } from 'typeorm';
import { OrdersEntity } from 'src/orders/entities/order.entity';
import * as bcrypt from 'bcrypt';
@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
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

    @OneToMany(() => OrdersEntity, order => order.user)
    orders: OrdersEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    @BeforeInsert()
    async hashPass(password: string) {
        this.password = await bcrypt.hash(password, "huylg");
    }


    async validatePassword(password: string): Promise<boolean> {
        const isValidUser = await bcrypt.compare(password, this.password);
        return isValidUser;
    }
}

