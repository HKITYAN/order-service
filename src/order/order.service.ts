import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { MapService } from '@/map/map.service';
import OrderCoordinate from './dto/orderCoordinate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from './enum/orderStatus.enum';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private readonly mapService: MapService
    ) {}

    private readonly logger = new Logger(OrderService.name);

    createOrder = async (orderCoordinates: OrderCoordinate) : Promise<Order> => {
        const origin = `${orderCoordinates.origin[0]},${orderCoordinates.origin[1]}`
        const destination = `${orderCoordinates.destination[0]},${orderCoordinates.destination[1]}`
        const distance : number = await this.mapService.getDistance(origin, destination);
        // if (distance === null) {
        //     this.logger.error("Order create failed, no distance obtained")
        //     throw new HttpException("FAIL_TO_GET_DISTANCE", HttpStatus.INTERNAL_SERVER_ERROR)
        // }
        const newOrder : Order = new Order(OrderStatus.UNASSIGNED, 100)
        const savedOrder : Order =await this.orderRepository.save(newOrder);
        this.logger.log(`Created order(${savedOrder.id}) successfully, current status ${savedOrder.status}`)
        
        return savedOrder;
    }
}
