import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';

@Controller('/')
@ApiTags("Order Controller")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @ApiOperation({ description: ""})
    @Post("")
    async test() {
        return this.orderService.test();
    }
}
