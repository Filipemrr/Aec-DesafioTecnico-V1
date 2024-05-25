import {
    ArgumentMetadata,
    BadRequestException,
    PipeTransform,
} from '@nestjs/common';

export class CreateAddressDTOPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any {
        if (
            !value.cep ||
            !value.logradouro ||
            !value.bairro ||
            !value.cidade ||
            !value.uf ||
            !value.numero
        ) {
            throw new BadRequestException('Itens obrigatórios não encontrados');
        }
        if (
            typeof value.cep !== 'string' ||
            typeof value.logradouro !== 'string' ||
            typeof value.bairro !== 'string' ||
            typeof value.cidade !== 'string' ||
            typeof value.uf !== 'string' ||
            typeof value.numero !== 'string'
        ) {
            throw new BadRequestException(
                'Dados Invalidos',
            );
        }
        return value;
    }
}

