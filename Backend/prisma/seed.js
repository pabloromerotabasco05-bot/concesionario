// backend/prisma/seed.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
const coche = await prisma.coche.upsert({
where: { id: 1 },
update: {},
create: { id: 1, marca: "Audi", modelo: "A4", color:"negro", anio:"2020",matricula:"2424BSD", combustible:"Gasolina"},
});

}
main().finally(() =&gt; prisma.$disconnect());