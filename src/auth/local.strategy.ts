import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService, private usersService: UsersService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail({ username, password });
        if (!user) {
            throw new BadRequestException('Tài khoản không hợp lệ');
        }
        return user;
    }
}