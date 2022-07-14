import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { StatusModule } from "./modules/status.module";
import { AccountsModule } from "./modules/accounts.module";
import { GlobalModule } from "./modules/global.module";
import { ErrorFilter } from "./filters/error.filter";
import { TransformInterceptor } from "./interceptors/transform.interceptor";

@Module({
  imports: [GlobalModule, StatusModule, AccountsModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule {}
