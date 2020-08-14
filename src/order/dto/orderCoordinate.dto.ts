import { ApiProperty } from "@nestjs/swagger";
import { IsString, ArrayMinSize, ArrayMaxSize } from 'class-validator'
import { IsLatLongArray } from "@/decorator/isLatLongArray.decorator";

class OrderCoordinate {
    @ApiProperty({ example: ["41.4320", "-81.38992"] })
    @IsString({each: true})
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsLatLongArray()
    origin: string[];

    @ApiProperty({ example: ["41.4320", "-81.38992"] })
    @IsString({each: true})
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsLatLongArray()
    destination: string[];
}

export default OrderCoordinate;