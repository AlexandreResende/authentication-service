-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "scopes" TEXT NOT NULL DEFAULT '',
    "createdAt" BIGINT NOT NULL,
    "updatedAt" BIGINT
);
INSERT INTO "new_User" ("createdAt", "email", "fullName", "id", "password", "updatedAt", "username") SELECT "createdAt", "email", "fullName", "id", "password", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
