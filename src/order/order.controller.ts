import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';
import OrderCoordinate from '@/order/dto/orderCoordinate.dto';
import { Response } from 'express';
import { Order } from './order.entity';

@Controller('/')
@ApiTags("Order Controller")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @ApiOperation({ description: "Post Order Here"})
    @Post()
    async postOrder(@Res() res: Response, @Body() orderCoordinate: OrderCoordinate) {
        const order : Order = await this.orderService.createOrder(orderCoordinate);
        return res.status(HttpStatus.OK).json(order)
    }
}
