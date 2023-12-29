
import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus, Request } from '@nestjs/common';
import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/decorator/pub';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }



  @Public()
  @Get("list")
  getList() {
    return this.usersService.findAll()
  }

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
