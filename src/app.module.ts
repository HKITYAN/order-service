import { Module, HttpModule } from '@nestjs/common';
import { RouterModule } from "nest-router"
import { routeConfig } from './route'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataBaseConfigFactory } from "@/config/database.config"
import { OrderModule } from './order/order.module';
import { MapService } from './map/map.service';
import { MapModule } from './map/map.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule.forRoutes(routeConfig),
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConfigFactory
    }),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    OrderModule,
    MapModule
  ],
})
export class AppModule {}
