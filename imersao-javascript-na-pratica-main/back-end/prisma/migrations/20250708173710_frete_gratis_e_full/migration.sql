-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "precoDesconto" REAL NOT NULL,
    "precoParcelado" REAL NOT NULL,
    "caracteristicas" TEXT NOT NULL,
    "imagens" TEXT NOT NULL,
    "estoque" INTEGER NOT NULL,
    "freteGratis" BOOLEAN NOT NULL DEFAULT false,
    "full" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Produto" ("caracteristicas", "estoque", "id", "imagens", "preco", "precoDesconto", "precoParcelado", "titulo") SELECT "caracteristicas", "estoque", "id", "imagens", "preco", "precoDesconto", "precoParcelado", "titulo" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
