import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import * as dotenv from 'dotenv';
import {AddressModule} from "./features/address/address.module";
dotenv.config();
@Module({
  imports: [UsersModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
