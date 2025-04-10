import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    create: {
      name: "alice",
      number: "111111111",
      password: await bcrypt.hash("alice", 10),
      balance:{
        create:{
          amount:20000,
          locked:0
        }
      }
    },
    update: {},
    where: {
      number: "111111111",
    },
  });
  console.log(alice);

  const bob = await prisma.user.upsert({
    create: {
      name: "bob",
      number: "000000000",
      password: await bcrypt.hash("bob", 10),
      balance:{
        create:{
          amount:10000,
          locked:0
        }
      }
    },
    update: {},
    where: {
      number: "000000000",
    },
  });
  console.log(bob);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

