/*
  Warnings:

  - You are about to drop the column `styles` on the `Produkt` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produkt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Produkt" ("createdAt", "description", "filePath", "id", "imagePath", "isAvailable", "name", "price", "updatedAt") SELECT "createdAt", "description", "filePath", "id", "imagePath", "isAvailable", "name", "price", "updatedAt" FROM "Produkt";
DROP TABLE "Produkt";
ALTER TABLE "new_Produkt" RENAME TO "Produkt";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
