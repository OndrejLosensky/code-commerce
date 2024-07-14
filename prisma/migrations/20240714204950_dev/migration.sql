/*
  Warnings:

  - You are about to drop the column `pricePaidInCents` on the `Objednavka` table. All the data in the column will be lost.
  - You are about to drop the column `isAvaiable` on the `Produkt` table. All the data in the column will be lost.
  - You are about to drop the column `priceInCents` on the `Produkt` table. All the data in the column will be lost.
  - Added the required column `pricePaid` to the `Objednavka` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Produkt` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Objednavka" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pricePaid" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "produktId" TEXT NOT NULL,
    CONSTRAINT "Objednavka_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Uzivatel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Objednavka_produktId_fkey" FOREIGN KEY ("produktId") REFERENCES "Produkt" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Objednavka" ("createdAt", "id", "produktId", "updatedAt", "userId") SELECT "createdAt", "id", "produktId", "updatedAt", "userId" FROM "Objednavka";
DROP TABLE "Objednavka";
ALTER TABLE "new_Objednavka" RENAME TO "Objednavka";
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
INSERT INTO "new_Produkt" ("createdAt", "description", "filePath", "id", "imagePath", "name", "updatedAt") SELECT "createdAt", "description", "filePath", "id", "imagePath", "name", "updatedAt" FROM "Produkt";
DROP TABLE "Produkt";
ALTER TABLE "new_Produkt" RENAME TO "Produkt";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
