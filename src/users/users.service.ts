import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password
    })

    return await this.usersRepository.save(user, { reload: true })
  }

  async findAll() {
    return await this.usersRepository.findAndCount();
  }
  async findOne(data: any): Promise<UsersEntity> {
    return await this.usersRepository.findOne({ where: { ...data } });
  }

  async findOneByEmail(email: string, password: string): Promise<UsersEntity | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && await user.validatePassword(password)) return user
    else return null
  }

  async update(condition: any, val: any) {
    await this.usersRepository.update(condition, val)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
