import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { OrderStatus } from "@/order/enum/orderStatus.enum";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 10 })
    status: OrderStatus

    @Column({ type: 'int' })
    distance: number;

    constructor(status: OrderStatus, distance: number) {
        this.status = status;
        this.distance = distance;
    }
    
}