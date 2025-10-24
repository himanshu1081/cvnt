# CVNT: Activity Booking API

A full-stack **Next.js** application providing a robust API for managing and booking activities, complete with user authentication, role-based access control, and booking validation.

This project was built as part of a Backend Assignment using **Next.js API routes**, **MongoDB/Mongoose**, and **JWT-based authentication**.

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js | Full-stack framework (API routes) |
| MongoDB & Mongoose | Database and ODM for storing users, activities, and bookings |
| JWT | Token-based authentication & authorization |
| Bcrypt | Password hashing for security |
| Tailwind CSS | Basic frontend styling |

---

## ✅ Features

### Authentication
- **Register** (`POST /api/auth/register`)
- **Login** (`POST /api/auth/login`)  
- Passwords are hashed with bcrypt.
- JWT tokens generated on login for session management.

### Activities (Admin Only)
- **CRUD operations**:
  - `GET /api/activity` – List all activities (public)
  - `GET /api/activity/[id]` – Single activity details (public)
  - `POST /api/activity/[id]` – Create activity
  - `PUT /api/activity/[id]` – Update activity
  - `DELETE /api/activity/[id]` – Delete activity  
- Only users with `isadmin: true` can create, update, or delete activities.

### Bookings (Authenticated Users)
- **Book an activity** (`POST /api/booking`)
- **List user bookings** (`GET /api/booking/me`)  
- Validations:
  - Prevents double booking
  - Checks activity capacity
  - Requires JWT authentication

### Error Handling
- Returns proper HTTP status codes for all API errors (`400`, `401`, `403`, `404`, `500`).

---

## ⚡ Setup Instructions

### Prerequisites
- Node.js v20.9+  
- MongoDB (local or cloud instance)  

### Installation
```bash
git clone [Your Repository URL]
cd cvnt
npm install
# or
yarn install
```

### Environment Variables
Create a `.env.local` file in the project root:

```env
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority"
SECRET="YOUR_JWT_SECRET_KEY_HERE"
```

### Running Locally
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/register` | Create new user |
| POST | `/api/auth/login` | Login user and receive JWT |

### Activities
| Method | Endpoint | Access | Description |
|--------|---------|-------|-------------|
| GET | `/api/activity` | Public | List all activities |
| GET | `/api/activity/[id]` | Public | Get single activity |
| POST | `/api/activity/[id]` | Admin | Create activity |
| PUT | `/api/activity/[id]` | Admin | Update activity |
| DELETE | `/api/activity/[id]` | Admin | Delete activity |

### Bookings
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/booking` | Book an activity (requires login) |
| GET | `/api/booking/me` | List logged-in user’s bookings |

---

## 📘 Testing
You can use **Postman** to test all endpoints. Import the collection from the `cvnt.postman_collection.json` file included in this repo. Make sure to include the JWT token in the `Authorization` header for protected routes.

---

## 🔐 Notes
- All passwords are hashed using bcrypt.  
- JWT is used for all authenticated routes.  
- Admin privileges required for activity CRUD operations.  
- Bookings check for double booking and capacity limits.

---

Made with ❤️ by Himanshu Chaudhary
