import { ApiQueryRestParams, apiQueryRest } from 'src/core/const';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, of } from 'rxjs';
import { ProductsEntity } from 'src/products/entities/product.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(ProductsEntity)
    private productRepository: Repository<ProductsEntity>,
  ) { }
  async create(createCommentDto: CreateCommentDto) {
    const data = await this.commentRepository.save(createCommentDto);
    await this.handleRating(data.id);
    return { data: "Đã tạo thành công" }
  }

  findAll(query: ApiQueryRestParams) {
    const q = { ...apiQueryRest(query), relations: ["user"] };
    return from(this.commentRepository.findAndCount(q)).pipe(
      map(([data, total]) => ({
        data, meta: { total, _page: +query._page, _limit: +query._limit },
      })),
    );
  }
  async handleRating(id: number) {
    const { data } = await this.findOne(id);
    const avg = await this.commentRepository.average("rate", { product: { id: data.product.id }, block: false });
    const proRate = await this.productRepository.findOne({ where: { id: data.product.id } })
    proRate.rating = Number(avg.toFixed(1));
    await proRate.save();
  }
  async findOne(id: number) {
    const data = await this.commentRepository.findOne({ where: { id }, relations: ["product"] });
    return { data }
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
