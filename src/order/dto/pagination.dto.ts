import { ApiProperty } from "@nestjs/swagger";
import { IsPositiveInteger } from "@/decorator/isPositiveInteger.decorator";

export class Pagination {
    @ApiProperty({ example: 1 })
    @IsPositiveInteger()
    page: string

    @ApiProperty({ example: 1 })
    @IsPositiveInteger()
    limit: string
}