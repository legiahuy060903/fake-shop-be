import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { ProductsEntity } from 'src/products/entities/product.entity';
import { LikeEntity } from './entities/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, ProductsEntity, LikeEntity])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }
