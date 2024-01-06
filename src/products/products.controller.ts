import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFiles, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/decorator/pub';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService, private cloudinaryService: CloudinaryService) { }

  @Public()
  @Post()
  @UseInterceptors(FilesInterceptor('images', 5))
  async uploadImage(@UploadedFiles() images: Array<Express.Multer.File>, @Body() createProductDto: CreateProductDto) {
    const arr = await this.cloudinaryService.uploadFiles(images);
    return await this.productsService.create(createProductDto, arr);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
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
