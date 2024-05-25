import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDTO {
    @ApiProperty()
    cep?: string;

    @ApiProperty()
    logradouro?: string;

    @ApiProperty({ required: false })
    complemento?: string;

    @ApiProperty()
    bairro?: string;

    @ApiProperty()
    cidade?: string;

    @ApiProperty()
    uf?: string;

    @ApiProperty()
    numero?: string;
}