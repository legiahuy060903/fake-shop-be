import { IsNotEmpty } from "class-validator";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { ImagesEntity } from "../entities/image.entity";
import { ProductsEntity } from "../entities/product.entity";

export class CreateProductDto {

    id: number
    @IsNotEmpty({ message: "Tên sách không được để trống" })
    name: string;

    @IsNotEmpty({ message: "Mô tả không được để trống" })
    description: string;

    public: boolean;
    publish_date: Date;
    author: string;
    number_of_page: number;
    sold: number;
    rating: number;
    price: number;
    view: number;
    category: CategoryEntity;
    images: ImagesEntity[];
    createdAt: Date;
    updatedAt: Date;
}
export class CreateImageDto {

    id: number;

    @IsNotEmpty({ message: "url không được để trống" })
    url: string;

    public_id: string;

    product: ProductsEntity;
    createdAt: Date;
    updatedAt: Date;
}


