import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class OrderId {
    @ApiProperty({ example: "c22a7249-f252-4dee-9cbc-735bac0f79b2" })
    @IsUUID()
    id: string
}