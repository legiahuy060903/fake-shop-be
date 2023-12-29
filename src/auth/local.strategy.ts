import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ passReqToCallback: true });
    }

    async validate(req: any): Promise<any> {
        const { email, password, type } = req.body;
        const user = await this.authService.validateUser(email, password, type);
        if (!user) {
            throw new UnauthorizedException("Tài khoản không hợp lệ");
        }
        return user;
    }
}