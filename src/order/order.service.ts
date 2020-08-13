import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { MapService } from '@/map/map.service';
import OrderCoordinate from './dto/orderCoordinate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository, SelectQueryBuilder, UpdateQueryBuilder } from 'typeorm';
import { Status } from './enum/status.enum';
import { query } from 'express';
import { UpdateStatus } from './dto/updateStatus.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private readonly mapService: MapService
    ) {}

    private readonly logger = new Logger(OrderService.name);

    createOrder = async (orderCoordinates: OrderCoordinate) : Promise<Order> => {
        this.logger.log("Creating order...")
        const origin = `${orderCoordinates.origin[0]},${orderCoordinates.origin[1]}`
        const destination = `${orderCoordinates.destination[0]},${orderCoordinates.destination[1]}`
        const distance : number = await this.mapService.getDistance(origin, destination);
        if (distance === null) {
            this.logger.error("Order create failed, no distance obtained")
            throw new HttpException("FAIL_TO_GET_DISTANCE", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        const newOrder : Order = new Order(Status.UNASSIGNED, 100)
        const savedOrder : Order = await this.orderRepository.save(newOrder);
        this.logger.log(`Created order(${savedOrder.id}) successfully, current status ${savedOrder.status}`)
        return savedOrder;
    }

    takeOrder = async (id: string) : Promise<UpdateStatus> => {
        this.logger.log(`Taking order(${id})...`)
        
        const order : Order = await this.orderRepository.findOne(id);
        
        
        if (order.status === Status.TAKEN) throw new HttpException("ORDER_ALREADY_TAKEN", HttpStatus.FORBIDDEN)

        // checking version before update to prevent concurrent access issue
        const result = await this.orderRepository.update({ id, version: order.version }, { status: Status.TAKEN })
        if (result.affected === 0) throw new HttpException("ORDER_ALREADY_TAKEN", HttpStatus.FORBIDDEN) 

        
        this.logger.log(`Successfully taken order(${id})`)

        return { status: "SUCCESS" }

    }

    listOrder = async (page: number, limit: number) : Promise<Order[]>=> {
        this.logger.log("Retrieving orders ...")
        const offset : number = (page - 1) * limit;
        const orderList : Order[] = await this.orderRepository.find({
            order: {
                createdDate: "DESC"
            },
            skip: offset,
            take: limit

        })
        this.logger.log(`Total order retreived: ${orderList.length}`)
        return orderList;
    }


}
