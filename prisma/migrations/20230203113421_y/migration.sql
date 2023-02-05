-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Color" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "color" TEXT NOT NULL,
    "reactionTime" REAL NOT NULL,
    "time" TEXT NOT NULL
);
INSERT INTO "new_Color" ("color", "id", "reactionTime", "time") SELECT "color", "id", "reactionTime", "time" FROM "Color";
DROP TABLE "Color";
ALTER TABLE "new_Color" RENAME TO "Color";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
