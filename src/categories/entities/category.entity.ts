
import { ProductsEntity } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "boolean", default: false })
    block: boolean;


    // @ManyToOne(() => CategoryEntity, category => category.children, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    // parent: CategoryEntity;


    // @OneToMany(() => CategoryEntity, category => category.parent)
    // children: CategoryEntity[];

    @OneToMany(() => ProductsEntity, product => product.category)
    product: ProductsEntity[];

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: 'updated_at' })
    updatedAt: Date;


}

