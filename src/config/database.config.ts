import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataBaseConfigFactory implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {
    }
    createTypeOrmOptions() : TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get("HOST"),
            port: this.configService.get("PORT"),
            username: this.configService.get("USERNAME"),
            password: this.configService.get("PASSWORD"),
            database: this.configService.get("DATABASE"),
            entities: [],
            // synchronize: true
        }
    }
}