@echo off
title Harvest Church Next.js Server Launcher
echo ==========================================================
echo       HARVEST CHURCH WEBSITE DEVELOPER SERVER LAUNCHER
echo ==========================================================
echo.
echo [1/3] Generating Prisma database client...
call npx prisma generate
echo.
echo [2/3] Checking/pushing schema updates...
call npx prisma db push
echo.
echo [3/3] Starting Next.js Dev Server...
echo.
echo Server starting at http://localhost:3000
echo.
npm run dev
pause
