# Cabinet Hannit - Medical Website

Full-stack medical cabinet website built with Laravel 9 (API) and React (Frontend).

## Prerequisites

- PHP 8.0+
- Composer
- Node.js & NPM
- SQLite (default) or MySQL

## Project Structure

- `backend/`: Laravel API
- `frontend/`: React SPA

## Setup Instructions

### 1. Backend Setup (Laravel)

```bash
cd backend
composer install
cp .env.example .env
# Edit .env to set DB_CONNECTION=sqlite (or mysql credentials)
touch database/database.sqlite # If using SQLite
php artisan migrate --seed
php artisan key:generate
php artisan serve
```

The API will be available at `http://localhost:8000`.

**Default Admin Credentials:**
- Email: `admin@cabinethannit.ma`
- Password: `password`

### 2. Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

## Features

- **Public Pages**: Home, About, Services, Doctors, Contact, Appointment Booking.
- **Admin Dashboard**: manage appointments, view messages, stats.
- **Authentication**: Secure admin login with Sanctum.

## Tech Stack

- **Backend**: Laravel 9, Sanctum, SQLite/MySQL
- **Frontend**: React 18, Vite, React Router, Axios
- **Styling**: Vanilla CSS (CSS Modules/Global Styles) with responsive design

## Note

Google OAuth 2.0 configuration requires setting up Google Console credentials and adding `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env` and configuring Socialite (not fully implemented in this MVP).
