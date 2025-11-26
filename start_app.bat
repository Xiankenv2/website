@echo off
echo Starting Waterveiligheid Application...

echo Starting Backend...
start cmd /k "cd backend && node index.js"

echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"

echo Application started!
echo Backend running on http://localhost:3000
echo Frontend running on http://localhost:5173
pause
