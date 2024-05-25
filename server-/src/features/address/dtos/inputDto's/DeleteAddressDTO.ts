import { ApiProperty } from '@nestjs/swagger';

export class DeleteAddressDTO {
    @ApiProperty()
    addressID: number;
}