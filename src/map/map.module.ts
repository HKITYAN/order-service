import { Module, HttpModule } from '@nestjs/common';
import { MapService } from './map.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  providers: [MapService],
  exports: [MapService]
})
export class MapModule {}
