import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MapService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.mapServiceUrl = this.configService.get("MAP_SERVICE_URL");
        
    }

    private readonly mapServiceUrl;
    getDistance = async () : Promise<number> => {
        console.log(this.mapServiceUrl)
        return 1;
    }
}
