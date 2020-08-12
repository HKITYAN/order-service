import { Controller, Post, Body, Res, HttpStatus, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { OrderService } from './order.service';
import OrderCoordinate from '@/order/dto/orderCoordinate.dto';
import { Response } from 'express';
import { Order } from './order.entity';
import { OrderId } from './dto/orderId.dto';

@Controller('/')
@ApiTags("Order Controller")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @ApiOperation({ description: "Create an order"})
    @Post()
    async createOrder(@Res() res: Response, @Body() orderCoordinate: OrderCoordinate) {
        const order : Order = await this.orderService.createOrder(orderCoordinate);
        return res.status(HttpStatus.OK).json(order)
    }

    @ApiOperation({ description: "Take an order" })
    @Patch("/:id")
    async takeOrder(@Res() res: Response,  @Param() { id }: OrderId) {
        await this.orderService.takeOrder(id);
        return res.status(HttpStatus.OK).json()
    }
}
