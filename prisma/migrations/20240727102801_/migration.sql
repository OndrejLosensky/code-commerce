/*
  Warnings:

  - The primary key for the `Page` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Page` table. All the data in the column will be lost.
  - Made the column `styles` on table `Page` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "styles" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Page" ("styles") SELECT "styles" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
