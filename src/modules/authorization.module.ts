import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "src/guards/local.strategy";
import { AccountsModule } from "./accounts.module";

@Module({
  imports: [PassportModule, AccountsModule],
  providers: [AuthorizationModule, LocalStrategy],
})
export class AuthorizationModule {}
