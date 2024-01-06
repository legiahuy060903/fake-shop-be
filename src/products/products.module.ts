import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsEntity } from './entities/product.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ImagesEntity } from './entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity, ImagesEntity]), CloudinaryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
