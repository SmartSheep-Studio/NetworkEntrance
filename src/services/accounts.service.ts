import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(username: string, password: string, contact: string) {
    let mode;
    try {
      if (contact.toLowerCase().match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
        mode = "email";
      } else if (
        contact
          .toLowerCase()
          .match(/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/)
      ) {
        mode = "phone";
      } else {
        return { data: null, code: "InvalidContact" };
      }
    } catch (e) {
      return { data: null, code: "InvalidContact" };
    }

    const permissions = [];
    (await this.prisma.permissions.findMany({ where: { is_default: true }, select: { name: true } })).filter((element) => {
      permissions.push(element.name);
    });

    try {
      const data = await this.prisma.users.create({
        data: {
          username: username,
          nickname: username,
          password: bcrypt.hashSync(password, 10),
          verifications: [{ contact: contact, mode: mode, verified: false }],
          permissions: permissions,
        },
      });
      return { data, code: "Success" };
    } catch (e) {
      return { data: null, code: "InvalidData" };
    }
  }
}
