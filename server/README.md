
# E-Commerce RESTful API (Backend)

This project is a fully-featured RESTful API for an e-commerce platform, built with Node.js, Express, and MongoDB. It supports authentication, product management, user management, categories, and cart functionality.

## Tech Stack

- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose**
- **JWT** (httpOnly cookies for authentication)
- **Zod** (data validation)
- **Bcrypt** (password hashing)
- **Multer** (image upload)
- **Nodemailer** (OTP-based password reset)
- **TypeScript** (type safety)

## Key Features

- TypeScript for type safety
- Modular folder structure for logic separation
- Middleware for authentication and file uploads
- OTP-based password reset
- Role-based access control (user, vendor, admin)

## Folder Structure

```text
server/
  src/
    controllers/      # Route handlers
    middlewares/      # Auth, validation, etc.
    models/           # Mongoose models
    routes/           # API route definitions
    types/            # TypeScript interfaces & schemas
    utils/            # Helper functions (mailer, etc.)
  config/             # Database config
  app.ts, server.ts   # Entry points
```

## Setup & Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see `.env.example`):
   - `MONGO_URI` (MongoDB connection string)
   - `JWT_SECRET`
   - `EMAIL_USER`, `EMAIL_PASS` (for nodemailer)
4. Run the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth (`/api/auth/*`)

- `POST /register` — Register user (firstName, lastName [optional], email, password, role [default: user])
- `POST /login` — Login (email, password). Sets JWT token in httpOnly cookie.
- `GET /me` — Get logged-in user data
- `POST /logout` — Logout and clear token cookie
- `POST /change-password` — Change password (oldPassword, newPassword)
- `POST /send-otp` — Send 6-digit OTP to email (if found)
- `POST /verify-otp` — Verify OTP (email, otp)
- `POST /reset-password` — Reset password (email, newPassword; OTP must be verified)

### Users (`/api/users/*`, Admin only)

- `GET /` — Get all users
- `GET /:id` — Get user by ID
- `PUT /:id` — Update user
- `DELETE /:id` — Delete user

### Products (`/api/products/*`)

- `POST /` — Add product (vendor/admin; name, description, price, image, category(id), inStock, countInStock, rating, numReviews)
- `GET /` — Get all products
- `GET /:id` — Get product by ID
- `PUT /:id` — Update product (vendor/admin)
- `DELETE /:id` — Delete product (vendor/admin)

### Categories (`/api/categories/*`)

- `POST /` — Add category (admin; name, description)
- `GET /` — Get all categories
- `GET /:id` — Get category by ID
- `PUT /:id` — Update category (admin)
- `DELETE /:id` — Delete category (admin)

### Cart (`/api/cart/*`, user from JWT)

- `POST /` — Add product to cart (productId, quantity)
- `GET /` — Get cart data
- `PUT /:id` — Update single product in cart
- `DELETE /:id` — Remove item from cart
- `DELETE /clear` — Clear cart

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT