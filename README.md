## Installation

-   Clone this repository `git clone https://github.com/myonaingwinn/laravel-twilio.git`.
-   Run `composer install`.
-   Run `cd frontend && npm install`.

## Configuration

**Backend**

-   Run `cp .env.example .env && php artisan key:generate`.
-   Enter your twilio account info in that _.env_ file.

**Frontend**

-   Run `cd frontend && cp .env.example .env`.
-   Enter Backend's BaseURL in that _.env_ file.
    For example, `REACT_APP_BASE_URL=http://localhost:8000/api/v1`

## Run

-   Frontend - `cd frontend && npm start`.
-   Backend - `php artisan serve`.
