import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { UsersEntity } from './users/entities/user.entity';
import { OrdersEntity } from './orders/entities/order.entity';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { CategoryEntity } from './categories/entities/category.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [UsersEntity, OrdersEntity, CategoryEntity],
        synchronize: true,
      })
    }),
    UsersModule,
    OrdersModule,
    AuthModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
