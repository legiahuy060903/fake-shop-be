import { IsNotEmpty } from "class-validator";

import { ProductsEntity } from "src/products/entities/product.entity";
import { UsersEntity } from "src/users/entities/user.entity";

export class CreateCommentDto {


    id: number;

    @IsNotEmpty({ message: "Nội dung không được để trống" })
    content: string;

    @IsNotEmpty({ message: "Đánh giá sao không được để trống" })
    rate: number;

    block: boolean;

    like: number;

    @IsNotEmpty({ message: "User không được để trống" })
    user: UsersEntity;

    @IsNotEmpty({ message: "Sản phẩm không được để trống" })
    product: ProductsEntity;


    createdAt: Date;
    updatedAt: Date;
}