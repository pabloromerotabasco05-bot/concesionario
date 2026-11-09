-- CreateTable
CREATE TABLE "Coche" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "marca" TEXT NOT NULL,
    "modelo" TEXT,
    "color" TEXT,
    "anio" TEXT,
    "matricula" TEXT NOT NULL
);
