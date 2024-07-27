/*
  Warnings:

  - You are about to drop the `Homepage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Homepage";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "style" TEXT NOT NULL
);
