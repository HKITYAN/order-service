import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

enum UpdateStatusEnum {
    TAKEN="TAKEN"
}

export class UpdateStatus {
    @ApiProperty({ example: UpdateStatusEnum.TAKEN })
    @IsEnum(UpdateStatusEnum)
    status: string
}