import { AuthService } from './../auth/auth.service';
import { Controller, Get, Post, Body, UseGuards, Res, Req, Query, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Public, User } from 'src/decorator/pub';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersEntity } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private usersService: UsersService
    ) { }

    @Public()
    @Post("register")
    async create(@Body() createUserDto: CreateUserDto) {
        const checkMail = await this.usersService.findOne({ email: createUserDto.email });
        if (checkMail) {
            throw new HttpException(
                {
                    status: HttpStatus.CONFLICT,
                    error: 'Email đã được sử dụng',
                },
                HttpStatus.CONFLICT,
            );
        } else {
            return await this.usersService.create(createUserDto);
        }
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: any, @Res({ passthrough: true }) response: Response) {
        return this.authService.handleLogin(req.user, response)
    }

    @Public()
    @Post('login-social')
    async loginWithSocial(@Req() req: any, @Res({ passthrough: true }) response: Response) {
        const { email, type } = req.body;
        if (type && type !== "credentials") {
            const user = await this.authService.handleSocial({ email, type, response })
            return user
        } else throw new HttpException(
            {
                status: HttpStatus.CONFLICT,
                error: 'Không đúng định dạng'
            },
            HttpStatus.UNAUTHORIZED,
        );


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

    @Public()
    @Get('logout')
    async logout(@Query("id") id: number, @Res({ passthrough: true }) response: Response) {
        return await this.authService.handleLogout(id, response)
    }
}
