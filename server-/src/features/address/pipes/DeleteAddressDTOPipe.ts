import {
    ArgumentMetadata,
    BadRequestException,
    PipeTransform,
} from '@nestjs/common';

export class DeleteAddressDTOPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any {
        if (
            !value.addressID
        ) {
            throw new BadRequestException('Itens obrigatórios não encontrados');
        }
        if (
            typeof value.addressID !== 'number'
        ) {
            throw new BadRequestException(
                'Dados Invalidos',
            );
        }
        return value;
    }
}

