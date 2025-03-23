import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Crear roles primero
  const adminRole = await prisma.roles.create({
    data: { name: 'Admin' }
  });
  const userRole = await prisma.roles.create({
    data: { name: 'User' }
  });

  const hashed = await bcrypt.hash('password', 10);
  // Crear usuarios con los IDs de los roles creados
  await prisma.user.createMany({
    data: [
      { username: 'Victor', email: 'admin@example.com', password: hashed, roleId: 1 },
      { username: 'Titina', email: 'user@example.com', password: hashed, roleId: 2 },
    ]
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });