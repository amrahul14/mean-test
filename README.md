# MEAN Stack Take-Home Test — Atdrive

Full-stack web application demonstrating the MEAN stack (MongoDB, Express, Angular, Node.js) with JWT authentication, reactive state management, and live weather data.

---

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | Angular 19 (standalone components, RxJS BehaviorSubject) |
| Backend  | Node.js + Express 5 |
| Database | MongoDB Atlas (Products) · MySQL (Users) |
| Auth     | JWT + bcrypt |
| Weather  | OpenWeatherMap API |

---

## Project Structure

```
mean-test/
├── server/          Express API (port 5000)
│   ├── config/      MongoDB + MySQL connections
│   ├── controllers/ Business logic
│   ├── middleware/  JWT auth middleware
│   ├── models/      Mongoose schemas
│   └── routes/      API route definitions
└── client/          Angular app (port 4200)
    └── src/app/
        ├── components/
        │   ├── auth/        Login + Register
        │   ├── products/    Full CRUD + Weather widget
        │   └── weather/     Dashboard weather widget
        ├── guards/          AuthGuard (route protection)
        ├── interceptors/    JWT auto-attach interceptor
        ├── models/          TypeScript interfaces
        └── services/        Auth · Product · Weather services
```

---

## Prerequisites

- Node.js 18+
- MySQL running locally
- MongoDB Atlas connection string (or local MongoDB)
- OpenWeatherMap API key (free tier at openweathermap.org)

---

## Backend Setup

1. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Create `.env` file** in the `server/` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/meantest
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE=mean_test
   JWT_SECRET=your_super_secret_key
   WEATHER_API_KEY=your_openweathermap_api_key
   ```

3. **Create the MySQL database and users table**
   ```sql
   CREATE DATABASE IF NOT EXISTS mean_test;
   USE mean_test;

   CREATE TABLE IF NOT EXISTS users (
     id          INT AUTO_INCREMENT PRIMARY KEY,
     username    VARCHAR(100) UNIQUE NOT NULL,
     password    VARCHAR(255) NOT NULL,
     created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

4. **Start the server**
   ```bash
   npm run dev      # development (nodemon)
   # or
   node index.js    # production
   ```
   Server runs on **http://localhost:5000**

---

## Frontend Setup

1. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Start the dev server**
   ```bash
   npx ng serve
   ```
   App runs on **http://localhost:4200**

> The API URL is configured in `client/src/environments/environment.ts` → `http://localhost:5000/api`

---

## API Reference

### Auth (`/api/users`)

| Method | Endpoint              | Body                        | Response          |
|--------|-----------------------|-----------------------------|-------------------|
| POST   | `/api/users/register` | `{ username, password }`    | `{ message }`     |
| POST   | `/api/users/login`    | `{ username, password }`    | `{ token }`       |

### Products (`/api/products`)

| Method | Endpoint              | Body (POST/PUT)                     | Auth Required |
|--------|-----------------------|-------------------------------------|---------------|
| GET    | `/api/products`       | —                                   | No            |
| GET    | `/api/products/:id`   | —                                   | No            |
| POST   | `/api/products`       | `{ name, price, description }`      | No            |
| PUT    | `/api/products/:id`   | `{ name, price, description }`      | No            |
| DELETE | `/api/products/:id`   | —                                   | No            |

### Weather (`/api/weather`)

| Method | Endpoint              | Query Params | Response                                     |
|--------|-----------------------|--------------|----------------------------------------------|
| GET    | `/api/weather`        | `city=Delhi` | `{ city, temperature, description, humidity, icon }` |

---

## Key Frontend Features

### HTTP Interceptor (`interceptors/auth.interceptor.ts`)
Automatically attaches the JWT token to every outgoing HTTP request:
```
Authorization: Bearer <token>
```

### Auth Guard (`guards/auth.guard.ts`)
Functional guard that protects the `/products` route. Unauthenticated users are redirected to `/auth`.

### BehaviorSubject State Management (`services/product.service.ts`)
Products are stored in a `BehaviorSubject<Product[]>` so all CRUD operations update the UI reactively without full re-fetches.

### App Routes
| Path        | Component  | Guard     |
|-------------|------------|-----------|
| `/`         | →          | redirects to `/products` |
| `/auth`     | AuthComponent | — |
| `/products` | ProductsComponent | authGuard |
| `**`        | →          | redirects to `/auth` |

---

## Running Both Servers

Open two terminals:

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npx ng serve
```

Then open **http://localhost:4200** in your browser.
