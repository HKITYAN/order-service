import { Module } from '@nestjs/common';
import { RouterModule } from "nest-router"
import { routeConfig } from './route'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataBaseConfigFactory } from "@/config/database.config"
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule.forRoutes(routeConfig),
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConfigFactory
    }),
    OrderModule
  ]
})
export class AppModule {}
