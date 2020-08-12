import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MapService } from '@/map/map.service';
import OrderCoordinate from './dto/orderCoordinate.dto';

@Injectable()
export class OrderService {
    constructor(private readonly mapService: MapService) {}
    createOrder = async (orderCoordinates: OrderCoordinate) : Promise<number> => {
        const origin = `${orderCoordinates.origin[0]},${orderCoordinates.origin[1]}`
        const destination = `${orderCoordinates.destination[0]},${orderCoordinates.destination[1]}`
        const distance : number = await this.mapService.getDistance(origin, destination);
        if (distance === null) {
            throw new HttpException("FAIL_TO_GET_DISTANCE", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return distance;
    }
}
