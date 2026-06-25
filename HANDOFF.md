## Project: MEAN Stack Take-Home Test (Atdrive)

## Backend: COMPLETE ✅

- Express server on port 5000
- MongoDB (Atlas) — Products + Orders
- MySQL (local) — Users
- Routes: /api/products, /api/users, /api/orders, /api/weather
- JWT auth middleware on orders
- bcrypt password hashing

## Frontend: IN PROGRESS (Angular, port 4200, standalone components)

- HttpClient enabled
- environment.ts set (apiUrl: http://localhost:5000/api)
- Services created:
  - AuthService (BehaviorSubject for login state, localStorage token)
  - ProductService (BehaviorSubject for state management, full CRUD)
  - WeatherService (city query param)

## Remaining Work:

1. HTTP Interceptor — har request mein JWT token auto-attach
2. Auth Guard — login ke bina products page nahi
3. Components:
   - Login/Register (auth)
   - Products list + create/edit/delete (CRUD)
   - Weather widget (dashboard)
4. Routing setup
5. README
6. GitHub push + email to recruitment@atdrive.com

## Folder Structure:

mean-test/
├── server/ (backend - complete)
└── client/ (Angular frontend - services done, components remaining)
