import {
  Body,
  Controller, Delete,
  Get,
  HttpStatus,
  Post,
  Put, Query,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomResponse } from '../../core/domain/ResponseModel/CustomResponse'
import { AddressService } from './address.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateAddressDTO } from "./dtos/inputDto's/UpdateAddressDTO";
import { CreateAddressDTO } from "./dtos/inputDto's/CreateAddressDTO";
import {CreateAddressDTOPipe} from "./pipes/CreateAddressDTOPipe";
import {UpdateAddressDTOPipe} from "./pipes/UpdateAddressDTOPipe";
import {DeleteAddressDTOPipe} from "./pipes/DeleteAddressDTOPipe";
import {DeleteAddressDTO} from "./dtos/inputDto's/DeleteAddressDTO";
@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}
  @Post('/novoEndereco')
  @UsePipes(CreateAddressDTOPipe)
  async addUser(
    @Res() res: Response,
    @Req() req: Request,
    @Body() newAddress: CreateAddressDTO,
  ): Promise<Response> {
    const registerAddressInfo =
      await this.addressService.createAddress(newAddress, req['userId']);
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', registerAddressInfo));
  }
  @Get('/buscarEnderecos')
  async getUserInfo(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const AddressList: CreateAddressDTO[] = await this.addressService.getAllAddresses(
      req['userId'],
    );
    return res.status(200).json(new CustomResponse(200, 'Success', AddressList));
  }

  @Put('/alterarEndereco')
  @UsePipes(UpdateAddressDTOPipe)
  async updateAddress(
      @Res() res: Response,
      @Req() req: Request,
      @Body() updatedInfo: UpdateAddressDTO,
  ): Promise<Response> {
    const SuccessMessage: object = await this.addressService.updateAddress(
        req['userId'],
        updatedInfo
    );
    return res.status(200).json(new CustomResponse(200, 'Success', SuccessMessage))
  };

  @Delete('/deletarEndereco')
  @UsePipes(DeleteAddressDTOPipe)
  async deleteAddress(
      @Res() res: Response,
      @Req() req: Request,
      @Body() deleteAddress: DeleteAddressDTO
  ): Promise<Response> {
    const SuccessMessage: object = await this.addressService.deleteAddress(
        req['userId'],
        deleteAddress
    );
    return res.status(200).json(new CustomResponse(200, 'Success', SuccessMessage))
  };
}
