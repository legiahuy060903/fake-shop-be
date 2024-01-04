
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: "boolean", default: true })
    public: boolean;

    @CreateDateColumn({ type: "timestamp" })
    publish_date: Date

    @Column()
    author: string;

    @Column()
    categoryId: number;

    @Column()
    number_of_page: number;

    @Column({ default: 1 })
    sold: number;

    @Column({ default: 5 })
    rating: number;

    @Column()
    price: number;

    @Column({ default: 1 })
    view: number;

    @ManyToOne(() => CategoryEntity, category => category.product)
    @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
    category: CategoryEntity;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: 'updated_at' })
    updatedAt: Date;


}