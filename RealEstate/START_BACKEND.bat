@echo off
echo ========================================
echo   Starting Backend Server...
echo ========================================
echo.

cd backend

REM Check if virtual environment exists
if not exist "venv\Scripts\activate.bat" (
    echo Creating virtual environment...
    python -m venv venv
    echo.
    echo Installing dependencies...
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
) else (
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
)

echo.
echo Starting server...
echo.
echo ========================================
echo   Backend is running!
echo   Keep this window open.
echo   Press Ctrl+C to stop.
echo ========================================
echo.

python run.py

pause



