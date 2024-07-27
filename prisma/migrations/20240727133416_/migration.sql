-- CreateTable
CREATE TABLE "Produkt" (
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

-- CreateTable
CREATE TABLE "Uzivatel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Objednavka" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pricePaid" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "produktId" TEXT NOT NULL,
    CONSTRAINT "Objednavka_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Uzivatel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Objednavka_produktId_fkey" FOREIGN KEY ("produktId") REFERENCES "Produkt" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DownloadControl" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produktId" TEXT NOT NULL,
    CONSTRAINT "DownloadControl_produktId_fkey" FOREIGN KEY ("produktId") REFERENCES "Produkt" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "count" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Homepage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "styles" TEXT NOT NULL,
    "layoutOption" INTEGER NOT NULL DEFAULT 1
);

-- CreateIndex
CREATE UNIQUE INDEX "Uzivatel_email_key" ON "Uzivatel"("email");
