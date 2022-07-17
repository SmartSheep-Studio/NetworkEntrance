import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async get(id: string) {
    return await this.prisma.users.findFirst({ where: { OR: [{ id: id }, { username: id }, { nickname: id }, { verifications: { every: { contact: { equals: id } } } }] } });
  }

  async validate(id: string, password: string) {
    return bcrypt.compareSync(password, (await this.get(id)).password);
  }

  async create(username: string, password: string, contact: string) {
    let mode: "EMAIL" | "PHONE";
    try {
      // Detect provide contact format
      if (contact.toLowerCase().match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
        mode = "EMAIL";
      } else if (
        contact
          .toLowerCase()
          .match(/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/)
      ) {
        mode = "PHONE";
      } else {
        return { data: null, code: "InvalidContact" };
      }

      // Detect contact is duplicated
      if ((await this.prisma.contacts.count({ where: { contact, mode } })) > 0) {
        return { data: null, code: "InvalidContact.Duplicated" };
      }
    } catch (e) {
      return { data: e, code: "InvalidContact.Unknown" };
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
          verifications: {
            create: [{ contact, mode }],
          },
          permissions: permissions,
        },
      });
      return { data, code: "Success" };
    } catch (e) {
      return { data: null, code: "InvalidData" };
    }
  }
}
