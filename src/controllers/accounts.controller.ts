import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AccountsService } from "src/services/accounts.service";

@Controller("/accounts")
export class AccountsController {
  constructor(private readonly accounts: AccountsService) {}

  @Post("/register")
  async registerAccount(@Body() body: { username: string; password: string; contact: string }) {
    const { data, code } = await this.accounts.create(body.username, body.password, body.contact);

    if (code === "Success") {
      return {
        code: code,
        data: data,
      };
    } else {
      throw new BadRequestException(code);
    }
  }
}
