import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtModule: JwtService, private configService: ConfigService) { }

    async validateUser(username: string, pass: string) {
        const user = await this.usersService.findOneByEmail(username, pass);
        if (user) {
            const access_token: string = this.jwtModule.sign({ ...user });
            const refreshtoken = this.jwtModule.sign({ ...user }, { secret: this.configService.get<string>("JWT_REFRESH_TOKEN"), expiresIn: this.configService.get<string>("JWT_REFRESH_EXPITE") })
            const result = { user: { ...user }, access_token, refreshtoken };
            return result
        } else return null
    }
}