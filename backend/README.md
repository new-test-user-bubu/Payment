# Payment Management System - Backend

A Node.js/Express REST API for managing multiple payment information types with role-based access control.

## Features

- User authentication (Register/Login) with JWT
- bcrypt password hashing (12 rounds)
- Role-based access control (User/Admin)
- Multiple payment method types: Bank, Paytm, UPI, PayPal, USDT
- Conditional field validation per payment type
- Ownership protection (users can only access their own payments)
- Admin dashboard with search/filter capabilities
- Secure API with proper error handling

## Tech Stack

- Node.js 18+
- Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- jsonwebtoken for authentication
- CORS enabled

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── paymentController.js # User payment CRUD
│   │   └── adminController.js  # Admin endpoints
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   ├── adminMiddleware.js  # Admin role check
│   │   └── errorMiddleware.js  # Error handling
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── PaymentMethod.js   # Payment method schema
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   ├── paymentRoutes.js   # User payment endpoints
│   │   └── adminRoutes.js     # Admin endpoints
│   ├── utils/
│   │   └── generateToken.js   # JWT utilities
│   ├── validators/
│   │   ├── authValidator.js   # Auth validation
│   │   └── paymentValidator.js # Payment validation
│   ├── app.js                 # Express app setup
│   └── server.js              # Entry point
├── package.json
├── .env.example
└── .gitignore
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### User Payments (Protected)
- `POST /api/payments` - Create payment method
- `GET /api/payments` - Get all user's payments
- `PUT /api/payments/:id` - Update payment method
- `DELETE /api/payments/:id` - Delete payment method

### Admin (Admin only)
- `GET /api/admin/payments` - Get all payments with filters
- `GET /api/admin/stats` - Get payment statistics

## Payment Types & Fields

| Type | Required Fields |
|------|-----------------|
| Bank | ifscCode, branchName, bankName, accountNumber, accountHolderName |
| Paytm | paytmNumber |
| UPI | upiId |
| PayPal | paypalEmail |
| USDT | usdtAddress |

## Environment Variables

Create a `.env` file from `.env.example`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/payment_management
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRE=7d
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@12345
FRONTEND_URL=http://localhost:5173
```

> **Note for macOS users:** Port 5000 is reserved by macOS for AirPlay Receiver (Control Center). If you encounter `EADDRINUSE` on port 5000, use `PORT=5001` in your `.env` file instead. The application will work correctly on any available port. Production on Render uses dynamic port assignment via `process.env.PORT`.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure `.env` with your MongoDB URI and secrets

3. Start MongoDB (local or Atlas)

4. Run development server:
```bash
npm run dev
```

5. Seed admin user:
```bash
npm run seed:admin
```

## Production Deployment

### Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
4. Add environment variables:
   - `MONGODB_URI` - MongoDB Atlas connection string
   - `JWT_SECRET` - Strong random secret (32+ chars)
   - `NODE_ENV=production`
   - `FRONTEND_URL` - Your Netlify frontend URL
   - `PORT` - Will be set by Render

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/payment_management
JWT_SECRET=generate-a-strong-random-secret
NODE_ENV=production
FRONTEND_URL=https://your-app.netlify.app
PORT=10000
```

## Security Features

- Passwords hashed with bcrypt (12 rounds)
- JWT tokens with 7-day expiry
- Protected routes with middleware
- Admin-only routes with role check
- Ownership verification on all payment operations
- Input validation on all endpoints
- CORS configured for specific frontend origin
- No sensitive data in logs or responses
- Masked sensitive data in API responses

## Response Format

Success:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error:
```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

## HTTP Status Codes

- 200 - OK
- 201 - Created
- 400 - Bad Request
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 409 - Conflict
- 500 - Internal Server Error

## License

MIT
