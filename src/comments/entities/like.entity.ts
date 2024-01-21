


import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { UsersEntity } from 'src/users/entities/user.entity';

@Entity({ name: 'like' })
export class LikeEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: ['like', 'dislike'], default: null })
    like: "like" | "dislike";

    @ManyToOne(() => CommentEntity, comment => comment.likes, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    comment: CommentEntity;

    @ManyToOne(() => UsersEntity, user => user.likes, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    user: UsersEntity;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: 'updated_at' })
    updatedAt: Date;
}

