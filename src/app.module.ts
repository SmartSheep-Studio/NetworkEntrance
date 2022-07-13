import { Module } from "@nestjs/common";
import { PrismaService } from "./services/prisma.service";
import { StatusModule } from "./modules/status.module";

@Module({
  imports: [StatusModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
