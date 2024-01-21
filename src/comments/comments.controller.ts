import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, CreateLikeDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiQueryRestParams } from 'src/core/const';
import { Public, User } from 'src/decorator/pub';
import { IUserToken } from 'src/types/ba.interface';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService,
  ) { }


  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Post('like')
  createLike(@Body() body: CreateLikeDto) {
    return this.commentsService.createLike(body)
  }

  @Public()
  @Get()
  findAll(@Query() query: ApiQueryRestParams) {
    return this.commentsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
