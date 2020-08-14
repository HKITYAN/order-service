import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Order } from '@/order/order.entity';

@Injectable()
export class DataBaseConfigFactory implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {
    }
    createTypeOrmOptions() : TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get("RDS_HOSTNAME"),
            port: this.configService.get("RDS_PORT"),
            username: this.configService.get("RDS_USERNAME"),
            password: this.configService.get("RDS_PASSWORD"),
            database: this.configService.get("RDS_DB_NAME"),
            entities: [Order],
            cache: true,
            keepConnectionAlive: true,
            synchronize: true
        }
    }
}