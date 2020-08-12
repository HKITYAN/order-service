import { Injectable } from '@nestjs/common';
import { MapService } from '@/map/map.service';

@Injectable()
export class OrderService {
    constructor(private readonly mapService: MapService) {}
    test = async () : Promise<number> => {
        const result : number = await this.mapService.getDistance()
        return result;
    }
}
