import { AuthService } from './../auth/auth.service';
import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/decorator/pub';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @Post()
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
  @Get("list")
  getList() {
    return this.usersService.findAll()
  }
  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return req.user;
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
