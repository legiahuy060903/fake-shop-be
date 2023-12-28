import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty({ message: "Email không được để trống" })
    @IsEmail({}, { message: "Đúng định dạng email" })
    email: string;

    @IsNotEmpty({ message: "Password không được để trống" })
    password: string;

    @IsNotEmpty({ message: "Tên không được để trống" })
    username: string;

    address: string;
    phone: string;
    role: string;
    avatar: string;
    gender: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}