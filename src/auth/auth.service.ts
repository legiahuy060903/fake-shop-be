import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Response, response } from 'express';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private configService: ConfigService) { }

    async validateUser(username: string, pass: string) {
        const user = await this.usersService.findOneByEmail(username, pass);
        return user ? user : null
    }
    handleLogin = async (user: UsersEntity, res: Response) => {
        const access_token: string = this.jwtService.sign({ ...user });
        const refreshToken = this.jwtService.sign({ ...user }, { secret: this.configService.get<string>("JWT_REFRESH_TOKEN"), expiresIn: this.configService.get<string>("JWT_REFRESH_EXPITE") })
        await this.usersService.update({ id: user.id }, { refreshToken });
        res.cookie('refreshtoken', refreshToken, { httpOnly: true, maxAge: 86400000 })
        return { user: user, meta: { access_token } };
    }

    checkRefreshToken = async (token: string, res: Response) => {
        try {
            const result = this.jwtService.verify(token, { secret: this.configService.get<string>("JWT_REFRESH_TOKEN") });
            const isUser = await this.usersService.findOne({ id: result.id });
            if (isUser) return { access_token: this.jwtService.sign({ ...isUser }) }
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