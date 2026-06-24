import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";
import * as fs from "fs";
import * as path from "path";

// Global singleton for Prisma to avoid multiple instances in development.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  let dbUrl = "file:dev.db";

  // If running in a Vercel serverless environment, copy the read-only database to /tmp
  if (process.env.VERCEL) {
    const srcPath = path.join(process.cwd(), "dev.db");
    const destPath = path.join("/tmp", "dev.db");

    if (!fs.existsSync(destPath)) {
      try {
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log("Successfully copied dev.db to /tmp/dev.db");
        } else {
          console.warn("Source dev.db not found at", srcPath);
        }
      } catch (err) {
        console.error("Failed to copy dev.db to /tmp/dev.db:", err);
      }
    }
    dbUrl = `file:${destPath}`;
  }

  const adapter = new PrismaBetterSqlite3({ url: dbUrl });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
