@echo off
echo ========================================
echo   Stopping All Services...
echo ========================================
echo.

echo Closing backend server...
taskkill /F /IM python.exe /FI "WINDOWTITLE eq *run.py*" 2>nul
taskkill /F /IM python.exe /FI "COMMANDLINE eq *run.py*" 2>nul

echo Closing frontend server...
taskkill /F /IM node.exe /FI "COMMANDLINE eq *vite*" 2>nul

echo.
echo ========================================
echo   All services stopped!
echo ========================================
echo.
pause



