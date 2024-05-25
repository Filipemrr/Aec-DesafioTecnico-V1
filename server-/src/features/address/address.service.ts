import {BadRequestException, ConflictException, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {Repository} from 'typeorm';
import {UserEntity} from '../../core/data/entities/userEntity/user.entity';
import {UpdateAddressDTO} from "./dtos/inputDto\'s/UpdateAddressDTO";
import {CreateAddressDTO} from "./dtos/inputDto's/CreateAddressDTO";
import {AddressEntity} from "../../core/data/entities/addressEntity/address.entity";
import {DeleteAddressDTO} from "./dtos/inputDto's/DeleteAddressDTO";
import * as timers from "timers";

@Injectable()
export class AddressService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,

    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async createAddress(prospectAddress: CreateAddressDTO, userID: number): Promise<object> {

    const previousUser: UserEntity = await this.userRepository.findOneBy({
      id: userID,
    });

    if (!previousUser) {
      throw new ConflictException('Usuario Invalido, faca o Login Novamente');
    }

    const createdAddress: AddressEntity = this.addressRepository.create();

    createdAddress.cep = prospectAddress.cep;
    createdAddress.logradouro = prospectAddress.logradouro;
    createdAddress.complemento = prospectAddress.complemento;
    createdAddress.bairro = prospectAddress.bairro;
    createdAddress.cidade = prospectAddress.cidade;
    createdAddress.uf = prospectAddress.uf;
    createdAddress.numero = prospectAddress.numero;
    createdAddress.user = previousUser;
    await this.addressRepository.save(createdAddress);
    return { message: `${previousUser.name} regristrou um novo endereco` };
  }
  async getAllAddresses(userId: number): Promise<CreateAddressDTO[]> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return await this.addressRepository.find({
      where: {
        user: user
      }
    });
  }
  async updateAddress(userId: number, updateAddressInfo: UpdateAddressDTO): Promise<object> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        id: userId,
      }
    });
    if (!user)
      throw new NotFoundException('Usuario não encontrado');

    const address: AddressEntity = await this.addressRepository.findOne({
      where : {
        id: updateAddressInfo.addressID,
        user: user,
      }
    });
    if (!address)
      throw new NotFoundException('ID do endereco eh invalido');

    Object.assign(address, updateAddressInfo);
    await this.addressRepository.save(address);
    return {message: `Endereco com CEP:${address.cep} foi Deletado com sucesso`}
  }

  async deleteAddress(userId: number, deleteAddresInfo: DeleteAddressDTO): Promise<object> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        id: userId,
      }
    });
    if (!user)
      throw new NotFoundException('Usuario não encontrado');

    const address: AddressEntity = await this.addressRepository.findOne({
      where: {
        id: deleteAddresInfo.addressID,
        user: user
      }
    })
    if (!address) throw new NotFoundException(`Endereco Nao encontrado`);
    await this.addressRepository.delete(deleteAddresInfo.addressID);
    return {message: `Endereco com CEP:${address.cep} foi Deletado com sucesso`}
  }
}
