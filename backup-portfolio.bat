@echo off
setlocal EnableExtensions EnableDelayedExpansion

title my-portfolio Backup

echo.
echo ============================================================
echo                 MY-PORTFOLIO BACKUP
echo ============================================================
echo.

REM Project directory = location of this BAT file
set "PROJECT_DIR=%~dp0"
if "%PROJECT_DIR:~-1%"=="\" set "PROJECT_DIR=%PROJECT_DIR:~0,-1%"

echo Project:
echo "%PROJECT_DIR%"
echo.

REM Backup directory
set "BACKUP_DIR=%PROJECT_DIR%\backups"

if not exist "%BACKUP_DIR%\." mkdir "%BACKUP_DIR%" >nul 2>&1

if not exist "%BACKUP_DIR%\." (
    echo ERROR: Could not create:
    echo "%BACKUP_DIR%"
    echo.
    pause
    exit /b 1
)

echo Backup directory:
echo "%BACKUP_DIR%"
echo.

REM Modern Windows timestamp
for /f "delims=" %%I in ('powershell -NoProfile -Command "Get-Date -Format ''yyyy-MM-dd_HH-mm-ss''"') do set "DATETIME=%%I"

if not defined DATETIME (
    echo ERROR: Could not generate timestamp.
    pause
    exit /b 1
)

set "ZIP_FILE=%BACKUP_DIR%\my-portfolio-backup-%DATETIME%.zip"

echo ZIP:
echo "%ZIP_FILE%"
echo.

REM Temporary staging directory
set "STAGING=%TEMP%\my-portfolio-backup-!RANDOM!!RANDOM!"
mkdir "!STAGING!" >nul 2>&1

if not exist "!STAGING!\." (
    echo ERROR: Could not create temporary backup directory.
    pause
    exit /b 1
)

REM Copy project, excluding dependencies, generated files, Git, backups, logs, and secrets
echo Preparing backup...
echo.

robocopy "%PROJECT_DIR%" "!STAGING!" /E ^
    /XD "%PROJECT_DIR%\node_modules" ^
        "%PROJECT_DIR%\.next" ^
        "%PROJECT_DIR%\.git" ^
        "%PROJECT_DIR%\backups" ^
        "%PROJECT_DIR%\coverage" ^
        "%PROJECT_DIR%\dist" ^
        "%PROJECT_DIR%\build" ^
        "%PROJECT_DIR%\out" ^
        "%PROJECT_DIR%\.turbo" ^
        "%PROJECT_DIR%\.vercel" ^
    /XF "*.zip" "*.log" ".env" ".env.*" ^
    /R:1 /W:1 /NFL /NDL /NJH /NJS

REM Create ZIP
echo.
echo Creating ZIP...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "Compress-Archive -Path '%STAGING%\*' -DestinationPath '%ZIP_FILE%' -CompressionLevel Optimal -Force"

if errorlevel 1 (
    echo.
    echo ERROR: ZIP creation failed.
    echo.
    rmdir /s /q "!STAGING!" >nul 2>&1
    pause
    exit /b 1
)

REM Cleanup
rmdir /s /q "!STAGING!" >nul 2>&1

REM Verify
if not exist "%ZIP_FILE%" (
    echo.
    echo ERROR: Backup ZIP was not created.
    echo.
    pause
    exit /b 1
)

for %%A in ("%ZIP_FILE%") do set "ZIP_SIZE=%%~zA"

echo.
echo ============================================================
echo             BACKUP COMPLETED SUCCESSFULLY
echo ============================================================
echo.
echo Project:
echo   my-portfolio
echo.
echo Backup:
echo   "%ZIP_FILE%"
echo.
echo Size:
echo   !ZIP_SIZE! bytes
echo.
echo Excluded:
echo   node_modules
echo   .next
echo   .git
echo   backups
echo   .env files
echo.
echo ============================================================
echo.

explorer "%BACKUP_DIR%"

pause
endlocal
