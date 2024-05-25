import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AddressController } from "./address.controller";
import { DatabaseModule } from "../../core/data/database.module";
import { AddressService } from "./address.service";
import { AuthMiddleware } from "../../core/infra/middlewares/auth-middleware.service";
import {AddressProviders} from "../../core/data/entities/addressEntity/address.providers";
import {UserProviders} from "../../core/data/entities/userEntity/user.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [...AddressProviders, ...UserProviders, AddressService],
  exports: [AddressService],
})
export class AddressModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'address/NovoEndereco', method: RequestMethod.POST },
          { path: 'address/buscarEnderecos', method: RequestMethod.GET },
          { path: 'address/alterarEndereco', method: RequestMethod.PUT },
          { path: 'address/deletarEndereco', method: RequestMethod.DELETE },
      );
  }
}
