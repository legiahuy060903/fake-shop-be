import {
  Controller, Get, Post, Body, Param, Delete, UseInterceptors,
  UploadedFiles, Put, Query, UploadedFile, ParseFilePipe, BadRequestException
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/decorator/pub';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiQueryRestParams } from 'src/core/const';
import { ValidationThumbnailPipe } from 'src/core/pipes/thumbFile.pipe';


export interface IFileProduct {
  thumbnail: Express.Multer.File, images?: Express.Multer.File[]
}
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService, private cloudinaryService: CloudinaryService) { }

  @Public()
  @Post()
  // @UseInterceptors(FileInterceptor('thumbnail'))
  // async uploadImage(@UploadedFile({}) thumbnail: Express.Multer.File, @Body() createProductDto: CreateProductDto) {

  // }
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 4 },
  ]))
  async create(@UploadedFiles(new ValidationThumbnailPipe()) files: IFileProduct,
    @Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto, files);
  }

  @Public()
  @Get()
  async findAll(@Query() query: ApiQueryRestParams) {
    return this.productsService.findAll(query);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Public()
  @Get('detail/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.productsService.findOneBySlug(slug);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productsService.remove(+id)
    return { data: "Xóa thành công" };
  }
}
