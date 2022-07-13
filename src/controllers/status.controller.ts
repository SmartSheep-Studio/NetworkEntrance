import { Controller, Get } from "@nestjs/common";

@Controller("/")
export class StatusController {
  @Get()
  GetStatus(): object {
    return {
      Code: "SUCCESS",
      Data: {
        Maintenance: false,
        Version: "1.02.1",
      },
    };
  }
}
