@echo off
echo Starting Cabinet Hannit Development Environment...

start "Laravel API" cmd /k "cd backend && php artisan serve"
start "React Frontend" cmd /k "cd frontend && npm run dev"

echo Servers starting...
echo API: http://localhost:8000
echo Frontend: http://localhost:3000
