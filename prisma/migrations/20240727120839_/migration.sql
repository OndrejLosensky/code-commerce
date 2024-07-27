-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Homepage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "styles" TEXT NOT NULL,
    "layoutOption" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Homepage" ("id", "styles") SELECT "id", "styles" FROM "Homepage";
DROP TABLE "Homepage";
ALTER TABLE "new_Homepage" RENAME TO "Homepage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
