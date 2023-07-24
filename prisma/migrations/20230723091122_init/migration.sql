/*
  Warnings:

  - Added the required column `type` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Expenses" ("amount", "createdAt", "id", "name", "updatedAt") SELECT "amount", "createdAt", "id", "name", "updatedAt" FROM "Expenses";
DROP TABLE "Expenses";
ALTER TABLE "new_Expenses" RENAME TO "Expenses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
