

import { ProductsEntity } from 'src/products/entities/product.entity';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity, ManyToOne } from 'typeorm';
import { LikeEntity } from './like.entity';

@Entity({ name: 'comment' })
export class CommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    content: string;

    @Column()
    rate: number;

    @Column({ type: "boolean", default: false })
    block: boolean;

    @OneToMany(() => LikeEntity, like => like.comment, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    likes: LikeEntity[];

    @ManyToOne(() => UsersEntity, user => user.comments, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    user: UsersEntity;

    // @OneToMany(() => CommentEntity, comment => comment.parentId)
    // children: CommentEntity[];

    @ManyToOne(() => ProductsEntity, product => product.comments, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    product: ProductsEntity;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: 'updated_at' })
    updatedAt: Date;
}

