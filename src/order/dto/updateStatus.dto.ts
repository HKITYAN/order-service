import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export enum UpdateStatusEnum {
    TAKEN="TAKEN"
}

export class UpdateStatus {
    @ApiProperty({ example: UpdateStatusEnum.TAKEN })
    @IsEnum(UpdateStatusEnum)
    status: string
}