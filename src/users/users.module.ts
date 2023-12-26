import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';
import { OrdersEntity } from 'src/orders/entities/order.entity'; // Adjust the path accordingly

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, OrdersEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }

