import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { CreateImageDto, CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, And, LessThan, MoreThan } from 'typeorm';
import { CloudinaryResponse, CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImagesEntity } from './entities/image.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ApiQueryRestParams, apiQueryRest, data, handleWeek } from 'src/core/const';
import { IFileProduct } from './products.controller';
import { Observable, from, map } from 'rxjs';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productRepository: Repository<ProductsEntity>,
    @InjectRepository(ImagesEntity)
    private imageRepository: Repository<ImagesEntity>,
    private cloudinaryService: CloudinaryService,
  ) { }



  async create(createProductDto: CreateProductDto, files: IFileProduct) {
    const thumbnail = await this.cloudinaryService.uploadFile(files.thumbnail);
    createProductDto.thumbnail = thumbnail.secure_url;
    if (files.images && files.images.length > 0) {
      const images: CloudinaryResponse[] = await this.cloudinaryService.uploadFiles(files.images);
      const imagesData: Partial<ImagesEntity>[] = images.map((item) => ({ url: item.secure_url }))
      const i = this.imageRepository.create(imagesData);
      const dataImages = await this.imageRepository.save(i, { reload: true });
      createProductDto.images = dataImages;
    }
    const product: ProductsEntity = this.productRepository.create(createProductDto);
    const result = await this.productRepository.save(product, { reload: true });
    return { data: result };
  }

  findAll(query: ApiQueryRestParams): Observable<{ data: any[], meta: { total: number, _page: number, _limit: number } }> {
    const q = { ...apiQueryRest(query), relations: ['category', 'images'] };
    return from(this.productRepository.findAndCount(q)).pipe(
      map(([data, total]) => ({
        data, meta: { total, _page: +query._page, _limit: +query._limit },
      })),
    );
  }


  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
  findOneBySlug(slug: string) {
    return from(this.productRepository.findOne({ where: { slug }, relations: ["images", "category"] })).pipe(
      map(item => ({
        data: {
          slides: [item.thumbnail, ...item.images.map(i => i.url)],
          ...item,
        }
      })),
    );
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return;
  }

  async remove(id: number) {
    const pro = await this.productRepository.findOne({ where: { id }, relations: ["images"] });
    if (pro) return await this.productRepository.remove(pro)
    else throw new BadRequestException("Id không tồn tại")
  }
  async ff() {
    for (const i of data) {
      const product = this.productRepository.create(i)
      await this.productRepository.save(product);
    }
  }
}
