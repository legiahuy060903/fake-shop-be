
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn, BeforeRemove } from 'typeorm';
import { ProductsEntity } from './product.entity';

@Entity({ name: 'images' })
export class ImagesEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(() => ProductsEntity, product => product.images, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    product: ProductsEntity;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: 'updated_at' })
    updatedAt: Date;

}