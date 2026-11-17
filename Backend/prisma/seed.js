// backend/prisma/seed.js
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });
async function main() {
const coche = await prisma.coche.upsert({
where: { id: 1 },
update: {},
create: { id: 1, marca: "Audi", modelo: "A4", color:"negro", anio:"2020",matricula:"2424BSD", combustible:"Gasolina"},
});

}
main().finally(() => prisma.$disconnect());