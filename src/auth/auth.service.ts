import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Response } from 'express';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private configService: ConfigService) { }

    async validateUser(email: string, pass: string, type: string) {
        let user = await this.usersService.findOneByEmail(email, pass);
        if (!user && type && type !== "credentials") {
            user = await this.usersService.create({ email, username: email, password: pass, type })
        }
        return user ? user : null
    }

    handleLogin = async (user: UsersEntity, res: Response) => {
        const { refreshToken: token, type, password, createdAt, updatedAt, ...data } = user
        const access_token: string = this.jwtService.sign({ ...data });
        const refreshToken = this.jwtService.sign({ ...data }, { secret: this.configService.get<string>("JWT_REFRESH_TOKEN"), expiresIn: this.configService.get<string>("JWT_REFRESH_EXPITE") })
        await this.usersService.update({ id: user.id }, { refreshToken });
        res.cookie('refreshtoken', refreshToken, { httpOnly: true, maxAge: 86400000 })
        return { user: data, meta: { access_token } };
    }

    checkRefreshToken = async (token: string, res: Response) => {
        try {
            const result = this.jwtService.verify(token, { secret: this.configService.get<string>("JWT_REFRESH_TOKEN") });
            const isUser = await this.usersService.findOne({ id: result.id });
            const { refreshToken, type, password, createdAt, updatedAt, ...data } = isUser
            if (isUser) return { access_token: this.jwtService.sign({ ...data }) }
            else throw new BadRequestException("Vui lòng đang nhập lại")
        } catch (error) {
            res.clearCookie("refreshtoken")
            throw new BadRequestException("Refresh token hết hạn. Vui lòng đang nhập lại")
        }
    }
    handleLogout = async (id: number, res: Response) => {
        try {
            res.clearCookie("refreshtoken")
            await this.usersService.update({ id }, { refreshToken: null });
            return true
        } catch (error) {
            throw new NotFoundException("Có lỗi xảy ra")
        }

    }
}