
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ApiQueryRestParams, apiQueryRest } from 'src/core/const';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const ca = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(ca, { reload: true });
  }

  async findAll(query: ApiQueryRestParams) {
    let con = apiQueryRest(query);
    const result = await this.categoryRepository.find(con);
    return { data: result };
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
