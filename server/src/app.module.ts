import { Module } from '@nestjs/common';
import { UsersModule } from './features/users/users.module';
import * as dotenv from 'dotenv';
import {AddressModule} from "./features/address/address.module";
dotenv.config();
@Module({
  imports: [UsersModule, AddressModule],
})
export class AppModule {}
