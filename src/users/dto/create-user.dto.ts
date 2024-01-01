import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty({ message: "Email không được để trống" })
    @IsEmail({}, { message: "Đúng định dạng email" })
    email: string;

    @IsNotEmpty({ message: "Password không được để trống" })
    password: string;


    username: string;

    type: string;
    address: string;
    phone: string;
    role: "R1" | "R2" | "R3";
    avatar: string;
    gender: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}
