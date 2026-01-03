@echo off
echo ========================================
echo   Starting Frontend Website...
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    echo This may take a few minutes...
    echo.
    call npm install
    echo.
)

echo.
echo Starting website...
echo.
echo ========================================
echo   Frontend is running!
echo   Open: http://localhost:5173
echo   Keep this window open.
echo   Press Ctrl+C to stop.
echo ========================================
echo.

call npm run dev

pause



