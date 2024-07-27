/*
  Warnings:

  - The primary key for the `Page` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "styles" TEXT NOT NULL
);
INSERT INTO "new_Page" ("styles") SELECT "styles" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
