import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productRepository: Repository<ProductsEntity>,
  ) { }
  async create(createProductDto: CreateProductDto) {
    const pro = this.productRepository.create(createProductDto);
    return await this.productRepository.save(pro, { reload: true });
  }

  async findAll() {
    return { data: await this.productRepository.find({ relations: ['category'] }) };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
