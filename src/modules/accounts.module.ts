/*
 * Accounts module
 * Channels + Users
 */

import { Module } from "@nestjs/common";
import { AccountsController } from "../controllers/accounts.controller";
import { AccountsService } from "src/services/accounts.service";
import { GlobalModule } from "./global.module";

@Module({
  imports: [GlobalModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
