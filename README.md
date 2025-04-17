# User Authentication API

A robust user authentication system built with Node.js, Express, MongoDB, and Passport.js. This API allows users to register, log in, and access their profile securely via token-based authentication. Includes unit tests and supports local development and stripe payment.

## Features

- User Registration
- Secure Password Hashing with Bcrypt
- JSON Web Token (JWT) Authentication with Passport.JS
- Protected User Profile Route
- Unit Testing with Jest & Supertest
- Input Validation
- Docker & Docker Compose Ready
- Stripe Payment Integration


## Set up the project
```bash
git https://github.com/junaid9011/user-authentication.git
cd user-authentication 
```

## Environment Variables

Create a `.env` file in the root directory and add the following:

```bash
NODE_ENV=dev
PORT=5000
DB_LOCAL_URL=mongodb://localhost:27017/user_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRE_TIME=15m
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_TIME=7d
STRIPE_SECRET_KEY=your_stripe_secret_key
```



## Install Dependencies

```bash
npm install
```

---

## Run Tests

```bash
npm test
```

---

## Run the App

###  Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

## Docker Setup

### Start the app using Docker Compose

```bash
docker-compose up --build
```

### Stop the app

```bash
docker-compose down
```

---

## API Endpoints

### Register - `POST /auth/register`

**Request Body:**

```json
{
  "name": "tester",
  "email": "test@example.com",
  "phone": "12345678901",
  "password": "password123"
}
```

---

### Login - `POST /auth/login`

**Request Body:**

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

---

###  Profile - `GET /auth/me`

**Headers:**

```
Authorization: Bearer <accessToken>
```

---

## Payment Api Endpoints

### Checkout Payment - `POST /payments/checkout`

**Request Body:**

```json
{
  "ammount": 50,
  "user": 'userId'
}
```


## 📝 License

MIT



