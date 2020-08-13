import { PrimaryGeneratedColumn, Column, Entity, VersionColumn, CreateDateColumn } from "typeorm";
import { Status } from "@/order/enum/status.enum";
import { Exclude } from "class-transformer";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 10 })
    status: Status

    @Column({ type: 'int' })
    distance: number;

    @VersionColumn() // add version for optimisstic locking
    @Exclude()
    version: number

    @CreateDateColumn()
    @Exclude()
    createdDate: Date

    constructor(status: Status, distance: number) {
        this.status = status;
        this.distance = distance;
    }
    
}