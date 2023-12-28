import { AuthService } from './../auth/auth.service';
import { Controller, Get, Post, Body, UseGuards, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { Public, User } from 'src/decorator/pub';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersEntity } from 'src/users/entities/user.entity';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: any, @Res({ passthrough: true }) response: Response) {
        return this.authService.handleLogin(req.user, response)
    }

    @Get('account')
    async getAccount(@User() user: UsersEntity) {
        return user
    }

    @Public()
    @Get('refresh')
    async handRefreshToken(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const cookie = request.cookies['refreshtoken'];
        return this.authService.checkRefreshToken(cookie, response)

    }
}
