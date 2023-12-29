import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { OrdersEntity } from 'src/orders/entities/order.entity';
import * as bcrypt from 'bcrypt';
@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ default: "credentials" })
    type: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ nullable: true })
    address: string;

    @Column({ type: "enum", enum: ['R1', 'R2', 'R3'], default: 'R1' })
    role: 'R1' | 'R2' | 'R3';

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true, length: 4000 })
    refreshToken: string

    @OneToMany(() => OrdersEntity, order => order.user)
    orders: OrdersEntity[];

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: 'updated_at' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPass() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }

    async validatePassword(password: string): Promise<boolean> {
        const isValidUser = await bcrypt.compare(password, this.password);
        return isValidUser;
    }
}

