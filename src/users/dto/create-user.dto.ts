import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty({ message: "Email không được để trống" })
    @IsEmail()
    username: string;

    @IsNotEmpty({ message: "Password không được để trống" })
    password: string;

    @IsNotEmpty({ message: "Tên không được để trống" })
    name: string;

    address: string;
    phone: string;
    role: string;
    avatar: string;
    gender: string;
    date: Date;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}