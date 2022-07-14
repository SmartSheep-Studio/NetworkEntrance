import { BadRequestException, Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { AccountsService } from "src/services/accounts.service";

@Controller("/accounts")
export class AccountsController {
  constructor(private readonly accounts: AccountsService) {}

  @Post("/register")
  @HttpCode(201)
  async registerAccount(@Res() response, @Body() body: { username: string; password: string; contact: string }) {
    const { data, code } = await this.accounts.createUser(body.username, body.password, body.contact);

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
