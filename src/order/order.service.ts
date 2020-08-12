import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
    test = () : String => {
        return "Jerry";
    }
}
