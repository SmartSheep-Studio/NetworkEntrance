import { PrismaClient } from "@prisma/client";

(async () => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  await prisma.permissions.createMany({
    data: [
      { name: "write:user", description: "Create/Update user" },
      { name: "delete:user", description: "Delete a user on server" },
      { name: "read:user", description: "Read other users information", is_default: true },
    ],
  });
})();
