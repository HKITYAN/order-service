import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MapModule } from '@/map/map.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';

@Module({
  imports: [MapModule, TypeOrmModule.forFeature([Order])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
