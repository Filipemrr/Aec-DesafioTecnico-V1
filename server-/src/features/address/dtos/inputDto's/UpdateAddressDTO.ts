import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDTO {

    @ApiProperty()
    addressID: number;

    @ApiProperty({ required: false })
    cep?: string;

    @ApiProperty({ required: false })
    logradouro?: string;

    @ApiProperty({ required: false })
    complemento?: string;

    @ApiProperty({ required: false })
    bairro?: string;

    @ApiProperty({ required: false })
    cidade?: string;

    @ApiProperty({ required: false })
    uf?: string;

    @ApiProperty({ required: false })
    numero?: string;
}