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

    //@IsNotEmpty({ message: "Ảnh chính không được để trống" })
    thumbnail: string;
    slug: string;
    per_discount: string;
    public: boolean;

    @IsNotEmpty({ message: "Ngày ra mắt không được để trống" })
    publish_date: string;

    @IsNotEmpty({ message: "Tác giả không được để trống" })
    author: string;

    @IsNotEmpty({ message: "Số trang không được để trống" })
    number_of_page: number;

    @IsNotEmpty({ message: "Số lượng không được để trống" })
    amount: number;
    sold: number;
    rating: number;

    @IsNotEmpty({ message: "Giá không được để trống" })
    price: number;

    @IsNotEmpty({ message: "Thể loại không được để trống" })
    category: CategoryEntity;

    view: number;
    images: ImagesEntity[];
    createdAt: Date;
    updatedAt: Date;
}
export class CreateImageDto {

    id: number;

    @IsNotEmpty({ message: "url không được để trống" })
    url: string;

    @IsNotEmpty({ message: "id sản phẩm không được để trống" })
    product: ProductsEntity;
    createdAt: Date;
    updatedAt: Date;
}


