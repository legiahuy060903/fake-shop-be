import { ApiQueryRestParams, apiQueryRest } from 'src/core/const';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto, CreateLikeDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/products/entities/product.entity';
import { IComment } from 'src/types/ba.interface';
import { LikeEntity } from './entities/like.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(LikeEntity)
    private likeRepository: Repository<LikeEntity>,
    @InjectRepository(ProductsEntity)
    private productRepository: Repository<ProductsEntity>,
  ) { }
  async create(createCommentDto: CreateCommentDto) {
    const data = await this.commentRepository.save(createCommentDto);
    await this.handleRating(data.id);
    return { data: "Đã tạo thành công" }
  }
  async createLike(body: CreateLikeDto) {
    //@ts-ignore
    const result = await this.likeRepository.findOne({ where: { comment: { id: body.comment }, user: { id: body.user } } });
    if (result) {
      if (result.like === body.like) result.like = null
      else if (result.like === null) result.like = body.like
      else result.like = body.like
      await result.save()
    } else await this.likeRepository.save(body);
    return { data: "Đã tạo thành công" }
  }

  async findAll(query: ApiQueryRestParams) {
    const q = {
      ...apiQueryRest(query),
      relations: ["user", "likes", "likes.user", "product"],
      select: { likes: { id: true, like: true, user: { id: true } } }
    };
    const idUser = query.idUser
    let qs = this.commentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.product', 'product')
      .leftJoin('comment.user', 'user')
      .leftJoin('comment.likes', 'likes')
      .leftJoin('likes.user', 'likeUser')
      .select(['comment', 'user.id', 'user.username', 'product.id', 'likes.id', 'likes.like', 'likeUser.id'])
      .where('comment.product = :id', { id: query._product })
      .loadRelationCountAndMap('comment.likeCount', 'comment.likes', 'like', qb => qb.andWhere('like.like = :like', { like: 'like' }))
      .loadRelationCountAndMap('comment.dislikeCount', 'comment.likes', 'dislike', qb => qb.andWhere('dislike.like = :dislike', { dislike: 'dislike' }))
      .groupBy('comment.id, product.id, user.id, likes.id, likeUser.id')
      .orderBy('comment.createdAt', query._order || 'DESC')
      .take(q.take)
      .skip(q.skip)
    if (idUser) qs.loadRelationIdAndMap('comment.isLiked', 'comment.likes', 'userInLike', qb => qb.andWhere('userInLike.user.id = :id', { id: idUser }))
    const [result, total] = await qs.getManyAndCount() as any as [IComment[], number]

    if (idUser) result.forEach(item => {
      let is = item.likes.find(i => i.id === item.isLiked[0])
      if (is) item.isLiked = is
      else delete item.isLiked
    })
    return { data: result, meta: { total, _page: +query._page, _limit: +query._limit } };
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
