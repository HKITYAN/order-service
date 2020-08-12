import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Swagger } from './swagger.module'

async function bootstrap() {
  const app  = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)
  
  Swagger.start(configService.get("ENV"), app);
  await app.listen(8080);
}
bootstrap();
