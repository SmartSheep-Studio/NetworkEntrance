import { Module } from "@nestjs/common";
import { StatusController } from "../controllers/status.controller";

@Module({
  controllers: [StatusController],
})
export class StatusModule {}
