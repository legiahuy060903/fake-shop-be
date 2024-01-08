import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) { }

  async create(createUserDto: DeepPartial<CreateUserDto>) {
    const user = this.usersRepository.create(createUserDto)
    return await this.usersRepository.save(user, { reload: true })
  }

  async findAll() {
    const [data, total] = await this.usersRepository.findAndCount();
    return { data, meta: { total } }
  }
  async findOne(data: any): Promise<UsersEntity> {
    return await this.usersRepository.findOne({ where: { ...data } });
  }

  async findOneByEmail({ username, password }): Promise<UsersEntity | null> {
    const user = await this.usersRepository.findOne({ where: [{ email: username }, { username: username }, { phone: username }] });
    if (user && user.type === "credentials" && await user.validatePassword(password)) return user
    return null
  }

  async update(condition: any, val: any) {
    await this.usersRepository.update(condition, val)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
