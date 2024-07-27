/*
  Warnings:

  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Page";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Homepage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "styles" TEXT NOT NULL
);
