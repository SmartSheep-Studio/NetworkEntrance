import { BadRequestException, Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AccountsService } from "src/services/accounts.service";

@Controller("/accounts")
export class AccountsController {
  constructor(private readonly accounts: AccountsService) {}

  @Post("/login")
  @UseGuards(AuthGuard("local"))
  async login(@Req() req) {
    return req.user;
  }

  @Post("/register")
  async register(@Body() body: { username: string; password: string; contact: string }) {
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
