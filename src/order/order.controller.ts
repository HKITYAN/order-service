import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';
import OrderCoordinate from '@/order/dto/orderCoordinate.dto';

@Controller('/')
@ApiTags("Order Controller")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @ApiOperation({ description: "Post Order here"})
    @Post()
    async postOrder(@Body() orderCoordinate: OrderCoordinate) {
        return this.orderService.test();
    }
}
