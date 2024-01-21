import { LikeEntity } from "src/comments/entities/like.entity";
import { ImagesEntity } from "src/products/entities/image.entity";
import { UsersEntity } from "src/users/entities/user.entity";

export interface ICategory {
    name: string,
    block: boolean,
    id: number,
    createdAt: Date
    updatedAt: Date
}
export interface IUserToken {
    id: number;
    username: string;
    email: string;
    role: "R1" | "R2" | "R3";
    type: string
}
export interface IProduct {
    id: number
    name: string;
    description: string;
    thumbnail: string;
    slug: string;
    public: boolean;
    publish_date: Date;
    author: string;
    number_of_page: number;
    amount: number;
    sold: number;
    rating: number;
    price: number;
    category: ICategory;
    view: number;
    images: ImagesEntity;
    slides: string[];
    createdAt: Date;
    updatedAt: Date;
}
export interface IComment {
    id: number;
    content: string;
    block: boolean;
    user: UsersEntity;
    product: IProduct;
    rate: number;
    likes: LikeEntity[],
    likeCount: number;
    dislikeCount: number;
    isLiked: any;
    createdAt: Date;
    updatedAt: Date;
}