import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import ms from "ms";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService,
        private configService: ConfigService, @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>) { }

    handleLogin = async (user: UsersEntity, res: Response) => {
        const { refreshToken: token, password, createdAt, updatedAt, ...data } = user
        const access_token: string = this.jwtService.sign({ ...data });
        const refreshToken = this.jwtService.sign({ ...data }, { secret: this.configService.get<string>("JWT_REFRESH_TOKEN"), expiresIn: this.configService.get<string>("JWT_REFRESH_EXPITE") })
        await this.usersService.update({ id: user.id }, { refreshToken });
        res.cookie('refreshtoken', refreshToken, { httpOnly: true, maxAge: ms(this.configService.get<string>("JWT_REFRESH_EXPITE")) });
        const expires = new Date().setTime(new Date().getTime() + ms(this.configService.get<string>("JWT_ACCESS_EXPITE")));
        return { user: data, access_token, refreshToken, expires };
    }
    handleSocial = async ({ email, type, username, response }: { email: string, type: string, username: string | undefined, response: Response }) => {
        let user = await this.usersService.findOne({ email });
        if (!user) user = await this.usersService.create({ email, type, username: username || email })
        return await this.handleLogin(user, response)
    }
    checkRefreshToken = async (token: string, res: Response) => {
        try {
            const result = this.jwtService.verify(token, { secret: this.configService.get<string>("JWT_REFRESH_TOKEN") });
            const user = await this.usersService.findOne({ id: result.id });
            if (user) return await this.handleLogin(user, res)
            else throw new ForbiddenException("Vui lòng đang nhập lại")
        } catch (error) {
            res.clearCookie("refreshtoken")
            throw new ForbiddenException("Refresh token hết hạn. Vui lòng đang nhập lại")
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