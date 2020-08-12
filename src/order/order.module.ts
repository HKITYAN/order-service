import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MapModule } from '@/map/map.module';

@Module({
  imports: [MapModule],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
