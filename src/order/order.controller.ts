import { Controller, Post, Body, Res, HttpStatus, Patch, Param, Get, Query, UseInterceptors, ClassSerializerInterceptor, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { OrderService } from './order.service';
import OrderCoordinate from '@/order/dto/orderCoordinate.dto';
import { Response } from 'express';
import { Order } from './order.entity';
import { OrderId } from './dto/orderId.dto';
import { Pagination } from './dto/pagination.dto';
import { UpdateStatus } from './dto/updateStatus.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('/')
@ApiTags("Order Controller")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @ApiOperation({ description: "Create an order"})
    @HttpCode(HttpStatus.OK) // overwrite default code 201 to 200, according to requirement
    @Post()
    async createOrder(@Body() orderCoordinate: OrderCoordinate) {
        const order : Order = await this.orderService.createOrder(orderCoordinate);
        return order;
    }

    @ApiOperation({ description: "Take an order" })
    @Patch("/:id")
    async takeOrder(@Param() { id }: OrderId, @Body() { status } : UpdateStatus) {
        const takeOrderResult : UpdateStatus = await this.orderService.takeOrder(id);
        return takeOrderResult;
    }

    @ApiOperation({ description: "Get order list"})
    @Get()
    async getOrderList(@Query() pagination: Pagination) {
        const page : number = parseInt(pagination.page)
        const limit : number = parseInt(pagination.limit)
        const orderList : Order[] = await this.orderService.listOrder(page, limit)
        return orderList;
    }
}
