import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AccountsService } from "../services/accounts.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private accounts: AccountsService) {
    super();
  }

  async validate(id: string, password: string): Promise<any> {
    const account = await this.accounts.get(id);
    if (!account && (await this.accounts.validate(id, password))) {
      throw new UnauthorizedException();
    }
    return { account };
  }
}
