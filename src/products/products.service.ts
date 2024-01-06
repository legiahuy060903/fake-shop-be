import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto, CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, BeforeRemove } from 'typeorm';
import { CloudinaryResponse, CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImagesEntity } from './entities/image.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productRepository: Repository<ProductsEntity>,
    @InjectRepository(ImagesEntity)
    private imageRepository: Repository<ImagesEntity>,
    private cloudinaryService: CloudinaryService,
  ) { }
  async create(createProductDto: CreateProductDto, images: CloudinaryResponse[]) {
    const imagesData: Partial<ImagesEntity>[] = images.map((item) => ({ url: item.secure_url }))
    const i = this.imageRepository.create(imagesData);
    const dataImages = await this.imageRepository.save(i, { reload: true });
    createProductDto.images = dataImages;
    const product: ProductsEntity = this.productRepository.create(createProductDto);
    const result = await this.productRepository.save(product, { reload: true });
    return { data: result };
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

  async remove(id: number) {
    const pro = await this.productRepository.findOne({ where: { id }, relations: ["images"] });
    if (pro) return await this.productRepository.remove(pro)
    else throw new BadRequestException("Id không tồn tại")
  }

}
