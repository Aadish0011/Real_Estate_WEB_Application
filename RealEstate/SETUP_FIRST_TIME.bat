@echo off
echo ========================================
echo   First Time Setup
echo   Real Estate Website
echo ========================================
echo.
echo This will set up everything for the first time.
echo It may take 5-10 minutes.
echo.
pause

echo.
echo Step 1: Checking Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed!
    echo.
    echo Please install Python from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation.
    echo.
    pause
    exit /b 1
) else (
    echo Python is installed! ✓
)

echo.
echo Step 2: Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Download the LTS version.
    echo.
    pause
    exit /b 1
) else (
    echo Node.js is installed! ✓
)

echo.
echo Step 3: Setting up Backend...
cd backend

if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing backend dependencies...
pip install -r requirements.txt

if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env >nul 2>&1
    echo Default admin password: admin123
)

cd ..

echo.
echo Step 4: Setting up Frontend...
if not exist "node_modules" (
    echo Installing frontend dependencies...
    echo This may take a few minutes...
    call npm install
)

if not exist ".env" (
    echo Creating .env file...
    echo VITE_API_URL=http://localhost:8000 > .env
)

echo.
echo ========================================
echo   Setup Complete! ✓
echo ========================================
echo.
echo Next steps:
echo 1. Double-click START_BACKEND.bat
echo 2. Double-click START_FRONTEND.bat
echo 3. Open http://localhost:5173 in your browser
echo.
pause



