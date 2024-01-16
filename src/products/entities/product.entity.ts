
import { CategoryEntity } from 'src/categories/entities/category.entity';
import {
    Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
    BaseEntity, ManyToOne, OneToMany, BeforeRemove, BeforeInsert, BeforeUpdate, BeforeRecover, AfterLoad
} from 'typeorm';
import { ImagesEntity } from './image.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ConfigService } from '@nestjs/config';
import { toSlug } from 'src/core/const';
import { CommentEntity } from 'src/comments/entities/comment.entity';

@Entity({ name: 'products' })
export class ProductsEntity extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "boolean", default: true })
    public: boolean;

    @Column()
    publish_date: string

    @Column()
    author: string;

    @Column()
    amount: number;

    @Column()
    number_of_page: number;

    @Column({ default: 1 })
    sold: number;

    @Column({ default: 5, type: "float" })
    rating: number;

    @Column()
    price: number;

    @Column({ default: 1 })
    view: number;

    @Column()
    thumbnail: string;

    @Column()
    slug: string;

    @ManyToOne(() => CategoryEntity, category => category.product, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    category: CategoryEntity | number;

    @OneToMany(() => ImagesEntity, image => image.product)
    images: ImagesEntity[];

    @OneToMany(() => CommentEntity, comment => comment.product)
    comments: CommentEntity[];

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: 'updated_at' })
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashUrlSlug() {
        this.slug = toSlug(this.name)
    }


    @BeforeRemove()
    async destroyed() {
        const cloud = new CloudinaryService(new ConfigService);
        await cloud.deleteImage(this.thumbnail);
        if (this.images.length > 0) {
            for (const image of this.images) {
                await cloud.deleteImage(image.url);
            }
        }
    }


}