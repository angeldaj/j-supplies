import { hash } from "bcryptjs";

import { PrismaClient, Role, UserStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD in environment.");
  }

  const passwordHash = await hash(adminPassword, 12);

  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      passwordHash,
      customerProfile: {
        upsert: {
          create: {
            firstName: "Angel",
            lastName: "Anton",
          },
          update: {
            firstName: "Angel",
            lastName: "Anton",
          },
        },
      },
    },
    create: {
      email: adminEmail,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      firstName: "Angel",
      lastName: "Anton",
      passwordHash,
      customerProfile: {
        create: {
          firstName: "Angel",
          lastName: "Anton",
        },
      },
    },
    include: {
      customerProfile: true,
    },
  });

  console.log(`Seeded admin user: ${user.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
