/*
  Warnings:

  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Usuario";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "precoDesconto" REAL NOT NULL,
    "precoParcelado" REAL NOT NULL,
    "caracteristicas" TEXT NOT NULL,
    "imagens" TEXT NOT NULL,
    "estoque" INTEGER NOT NULL
);
