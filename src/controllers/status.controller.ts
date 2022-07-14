import { Controller, Get } from "@nestjs/common";

@Controller()
export class StatusController {
  @Get()
  GetStatus(): object {
    return {
      code: "SUCCESS",
      data: {
        maintenance: false,
        version: "1.02.1",
      },
    };
  }
}
