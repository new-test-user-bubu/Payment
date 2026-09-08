## ./backend/.env

```
# Server
PORT=5001
NODE_ENV=development

# MongoDB - Use your MongoDB Atlas URI here
MONGODB_URI=mongodb://localhost:27017/payment_management

# JWT
JWT_SECRET=dev-secret-key-change-in-production-min-32-chars
JWT_EXPIRE=7d

# Admin Seeding
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@12345

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## ./backend/.env.example

```
# Server
PORT=5001
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/payment_management?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# Admin Seeding
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@12345

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## ./backend/.env.production

```
# Production Environment Variables
# Copy these to your hosting platform (Render)

# Server
NODE_ENV=production
PORT=10000

# MongoDB - Use MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/payment_management?retryWrites=true&w=majority

# JWT - Generate a strong random secret (32+ characters)
JWT_SECRET=your-super-strong-random-secret-key-at-least-32-chars
JWT_EXPIRE=7d

# Admin Seeding (for initial setup only)
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=YourStrongAdminPassword123

# Frontend URL - Your Netlify domain
FRONTEND_URL=https://your-app.netlify.app
```

## ./backend/.gitignore

```
# Dependencies
node_modules/

# Environment files
.env
.env.local
.env.*.local

# Logs
logs
*.log
npm-debug.log*

# Build output
dist/
build/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Testing
coverage/
.nyc_output/

# Misc
*.pem
.cache/
```

## ./backend/package.json

```
{
  "name": "payment-management-backend",
  "version": "1.0.0",
  "description": "Multiple Payment Information Management System - Backend API",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js",
    "seed:admin": "node src/scripts/seedAdmin.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.5.1"
  },
  "devDependencies": {},
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## ./backend/README.md

```
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
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/payment_management
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRE=7d
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@12345
FRONTEND_URL=http://localhost:5173
```

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
```

## ./backend/server.log

```
Server running in development mode on port 5001
MongoDB Connected: localhost
MongoDB disconnected
MongoDB disconnected
MongoDB disconnected
MongoDB disconnected
MongoDB disconnected
```

## ./backend/src/app.js

```
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
```

## ./backend/src/config/db.js

```
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
```

## ./backend/src/controllers/adminController.js

```
import PaymentMethod from '../models/PaymentMethod.js';
import User from '../models/User.js';

export const getAllPayments = async (req, res) => {
  try {
    const {
      username,
      paymentType,
      bankName,
      ifscCode,
      paytmNumber,
      upiId,
      paypalEmail,
      usdtAddress,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    // Build filter query
    if (username) {
      const users = await User.find({
        username: { $regex: username, $options: 'i' },
      }).select('_id');
      const userIds = users.map(u => u._id);
      query.user = { $in: userIds };
    }

    if (paymentType) {
      query.paymentType = paymentType;
    }

    if (bankName) {
      query.bankName = { $regex: bankName, $options: 'i' };
    }

    if (ifscCode) {
      query.ifscCode = { $regex: ifscCode, $options: 'i' };
    }

    if (paytmNumber) {
      query.paytmNumber = { $regex: paytmNumber, $options: 'i' };
    }

    if (upiId) {
      query.upiId = { $regex: upiId, $options: 'i' };
    }

    if (paypalEmail) {
      query.paypalEmail = { $regex: paypalEmail, $options: 'i' };
    }

    if (usdtAddress) {
      query.usdtAddress = { $regex: usdtAddress, $options: 'i' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    const [payments, total] = await Promise.all([
      PaymentMethod.find(query)
        .populate('user', 'username email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      PaymentMethod.countDocuments(query),
    ]);

    const maskedPayments = payments.map(p => ({
      ...p.getMaskedData(),
      user: p.user ? { username: p.user.username, email: p.user.email } : null,
    }));

    res.json({
      success: true,
      data: {
        payments: maskedPayments,
        pagination: {
          page: parseInt(page),
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getPaymentStats = async (req, res) => {
  try {
    const stats = await PaymentMethod.aggregate([
      {
        $group: {
          _id: '$paymentType',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalUsers = await User.countDocuments();
    const totalPayments = await PaymentMethod.countDocuments();

    res.json({
      success: true,
      data: {
        totalUsers,
        totalPayments,
        byType: stats,
      },
    });
  } catch (error) {
    throw error;
  }
};
```

## ./backend/src/controllers/authController.js

```
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    const user = await User.create({
      username,
      email,
      password,
      role: 'user',
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
    throw error;
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        token,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    throw error;
  }
};
```

## ./backend/src/controllers/paymentController.js

```
import PaymentMethod from '../models/PaymentMethod.js';

export const createPayment = async (req, res) => {
  try {
    const paymentData = {
      ...req.body,
      user: req.user.id,
    };

    const payment = await PaymentMethod.create(paymentData);

    res.status(201).json({
      success: true,
      message: 'Payment method added successfully',
      data: { payment: payment.getMaskedData() },
    });
  } catch (error) {
    throw error;
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await PaymentMethod.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    const maskedPayments = payments.map(p => p.getMaskedData());

    res.json({
      success: true,
      data: { payments: maskedPayments },
    });
  } catch (error) {
    throw error;
  }
};

export const updatePayment = async (req, res) => {
  try {
    const payment = await PaymentMethod.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found',
      });
    }

    // Check ownership
    if (payment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this payment method',
      });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (key !== 'user' && key !== '_id') {
        payment[key] = req.body[key];
      }
    });

    await payment.save();

    res.json({
      success: true,
      message: 'Payment method updated successfully',
      data: { payment: payment.getMaskedData() },
    });
  } catch (error) {
    throw error;
  }
};

export const deletePayment = async (req, res) => {
  try {
    const payment = await PaymentMethod.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found',
      });
    }

    // Check ownership
    if (payment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this payment method',
      });
    }

    await payment.deleteOne();

    res.json({
      success: true,
      message: 'Payment method deleted successfully',
    });
  } catch (error) {
    throw error;
  }
};
```

## ./backend/src/middleware/adminMiddleware.js

```
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required',
    });
  }
  next();
};
```

## ./backend/src/middleware/authMiddleware.js

```
import User from '../models/User.js';
import { verifyToken } from '../utils/generateToken.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);
      
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found. Authorization denied.',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Session expired. Please login again.',
        });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token. Authorization denied.',
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Authorization failed.',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided. Authorization denied.',
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }
    next();
  };
};
```

## ./backend/src/middleware/errorMiddleware.js

```
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource ID',
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
    });
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : message,
  });
};

export const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
};
```

## ./backend/src/models/PaymentMethod.js

```
import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      index: true,
    },
    paymentType: {
      type: String,
      enum: {
        values: ['Bank', 'Paytm', 'UPI', 'PayPal', 'USDT'],
        message: 'Invalid payment type',
      },
      required: [true, 'Payment type is required'],
    },
    // Bank fields
    ifscCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    branchName: {
      type: String,
      trim: true,
    },
    bankName: {
      type: String,
      trim: true,
    },
    accountNumber: {
      type: String,
      trim: true,
    },
    accountHolderName: {
      type: String,
      trim: true,
    },
    // Paytm field
    paytmNumber: {
      type: String,
      trim: true,
    },
    // UPI field
    upiId: {
      type: String,
      trim: true,
    },
    // PayPal field
    paypalEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    // USDT field
    usdtAddress: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for user payment queries
paymentMethodSchema.index({ user: 1, paymentType: 1 });

// Conditional validation based on paymentType
paymentMethodSchema.pre('validate', function (next) {
  const requiredFields = {
    Bank: ['ifscCode', 'branchName', 'bankName', 'accountNumber', 'accountHolderName'],
    Paytm: ['paytmNumber'],
    UPI: ['upiId'],
    PayPal: ['paypalEmail'],
    USDT: ['usdtAddress'],
  };

  const fields = requiredFields[this.paymentType] || [];
  
  for (const field of fields) {
    if (!this[field] || this[field].trim() === '') {
      this.invalidate(field, `${field} is required for ${this.paymentType} payment type`);
    }
  }

  // Additional format validations
  if (this.paymentType === 'PayPal' && this.paypalEmail) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(this.paypalEmail)) {
      this.invalidate('paypalEmail', 'Please provide a valid email address');
    }
  }

  if (this.paymentType === 'Bank' && this.ifscCode) {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscRegex.test(this.ifscCode)) {
      this.invalidate('ifscCode', 'Invalid IFSC code format');
    }
  }

  next();
});

// Method to get masked data for UI display
paymentMethodSchema.methods.getMaskedData = function () {
  const obj = this.toObject();
  
  switch (this.paymentType) {
    case 'Bank':
      if (obj.accountNumber) {
        const last4 = obj.accountNumber.slice(-4);
        obj.maskedAccountNumber = '•••• •••• ' + last4;
      }
      break;
    case 'Paytm':
      if (obj.paytmNumber) {
        const last4 = obj.paytmNumber.slice(-4);
        obj.maskedPaytmNumber = '********' + last4;
      }
      break;
    case 'USDT':
      if (obj.usdtAddress) {
        const prefix = obj.usdtAddress.slice(0, 4);
        const suffix = obj.usdtAddress.slice(-4);
        obj.maskedUsdtAddress = `${prefix}...${suffix}`;
      }
      break;
    case 'UPI':
      obj.maskedUpiId = obj.upiId;
      break;
    case 'PayPal':
      obj.maskedPaypalEmail = obj.paypalEmail;
      break;
  }
  
  return obj;
};

export default mongoose.model('PaymentMethod', paymentMethodSchema);
```

## ./backend/src/models/User.js

```
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', userSchema);
```

## ./backend/src/routes/adminRoutes.js

```
import express from 'express';
import { getAllPayments, getPaymentStats } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(requireAdmin);

router.get('/payments', getAllPayments);
router.get('/stats', getPaymentStats);

export default router;
```

## ./backend/src/routes/authRoutes.js

```
import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../validators/authValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);

export default router;
```

## ./backend/src/routes/paymentRoutes.js

```
import express from 'express';
import {
  createPayment,
  getPayments,
  updatePayment,
  deletePayment,
} from '../controllers/paymentController.js';
import { validatePayment, validatePaymentUpdate } from '../validators/paymentValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', validatePayment, createPayment);
router.get('/', getPayments);
router.put('/:id', validatePaymentUpdate, updatePayment);
router.delete('/:id', deletePayment);

export default router;
```

## ./backend/src/scripts/seedAdmin.js

```
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

dotenv.config();

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminUsername || !adminPassword) {
      console.error('Missing admin credentials in environment variables');
      console.error('Required: ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD');
      process.exit(1);
    }

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    await User.create({
      username: adminUsername,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created successfully');
    console.log(`Username: ${adminUsername}`);
    console.log(`Email: ${adminEmail}`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
```

## ./backend/src/server.js

```
import app from './app.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
```

## ./backend/src/utils/generateToken.js

```
import jwt from 'jsonwebtoken';

export const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
```

## ./backend/src/validators/authValidator.js

```
export const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = [];

  if (!username || username.trim().length < 3) {
    errors.push('Username must be at least 3 characters');
  }
  if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push('Please provide a valid email');
  }
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push('Please provide a valid email');
  }
  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};
```

## ./backend/src/validators/paymentValidator.js

```
const requiredFields = {
  Bank: ['ifscCode', 'branchName', 'bankName', 'accountNumber', 'accountHolderName'],
  Paytm: ['paytmNumber'],
  UPI: ['upiId'],
  PayPal: ['paypalEmail'],
  USDT: ['usdtAddress'],
};

export const validatePayment = (req, res, next) => {
  const { paymentType } = req.body;
  const errors = [];

  if (!paymentType || !requiredFields[paymentType]) {
    return res.status(400).json({
      success: false,
      message: 'Invalid payment type. Must be one of: Bank, Paytm, UPI, PayPal, USDT',
    });
  }

  const fields = requiredFields[paymentType];
  
  for (const field of fields) {
    const value = req.body[field];
    if (!value || value.trim() === '') {
      errors.push(`${field} is required for ${paymentType} payment type`);
    }
  }

  // Format validations
  if (paymentType === 'PayPal' && req.body.paypalEmail) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(req.body.paypalEmail)) {
      errors.push('Please provide a valid PayPal email address');
    }
  }

  if (paymentType === 'Bank' && req.body.ifscCode) {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscRegex.test(req.body.ifscCode)) {
      errors.push('Invalid IFSC code format');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

export const validatePaymentUpdate = (req, res, next) => {
  // For updates, we only validate fields that are being updated
  const { paymentType } = req.body;
  
  // If paymentType is being changed, validate all required fields for new type
  if (paymentType && requiredFields[paymentType]) {
    const fields = requiredFields[paymentType];
    const errors = [];
    
    for (const field of fields) {
      const value = req.body[field];
      if (!value || value.trim() === '') {
        errors.push(`${field} is required for ${paymentType} payment type`);
      }
    }
    
    if (paymentType === 'PayPal' && req.body.paypalEmail) {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(req.body.paypalEmail)) {
        errors.push('Please provide a valid PayPal email address');
      }
    }
    
    if (paymentType === 'Bank' && req.body.ifscCode) {
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!ifscRegex.test(req.body.ifscCode)) {
        errors.push('Invalid IFSC code format');
      }
    }
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
  }
  
  // If paymentType not changed, only validate provided fields
  if (!paymentType) {
    const errors = [];
    
    if (req.body.paypalEmail !== undefined) {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(req.body.paypalEmail)) {
        errors.push('Please provide a valid PayPal email address');
      }
    }
    
    if (req.body.ifscCode !== undefined) {
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!ifscRegex.test(req.body.ifscCode)) {
        errors.push('Invalid IFSC code format');
      }
    }
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
  }

  next();
};
```

## ./DEPLOYMENT_GUIDE.md

```
# Deployment Guide

## Overview

This guide covers deploying the Payment Management System to:
- **Backend**: Render
- **Frontend**: Netlify
- **Database**: MongoDB Atlas

## Prerequisites

1. GitHub account
2. MongoDB Atlas account
3. Render account
4. Netlify account

---

## 1. MongoDB Atlas Setup

### Create Cluster
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new project: "Payment Management"
3. Build a cluster (M0 Free tier works)
4. Choose cloud provider and region
5. Create cluster

### Database Access
1. Go to Database Access → Add New Database User
2. Username: `payment_admin`
3. Password: Generate secure password
4. Role: Atlas Admin (or Read/Write to any database)
5. Add user

### Network Access
1. Go to Network Access → Add IP Address
2. Add `0.0.0.0/0` (Allow access from anywhere) for Render/Netlify
3. Or add specific IPs if known

### Get Connection String
1. Go to Clusters → Connect → Connect your application
2. Driver: Node.js, Version: 4.1+
3. Copy connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `payment_management`

Example:
```
mongodb+srv://payment_admin:yourpassword@cluster0.xxxxx.mongodb.net/payment_management?retryWrites=true&w=majority
```

---

## 2. Backend Deployment (Render)

### Create Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. New → Web Service
3. Connect GitHub repository (backend folder)
4. Configure:
   - Name: `payment-management-api`
   - Root Directory: `backend`
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Free

### Environment Variables
Add these in Render Environment tab:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Generate with: `openssl rand -base64 32` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://your-app.netlify.app` |
| `PORT` | `10000` (Render sets this automatically) |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_EMAIL` | `admin@yourdomain.com` |
| `ADMIN_PASSWORD` | Strong password |

### Deploy
1. Click Create Web Service
2. Wait for build and deploy
3. Note the URL: `https://payment-management-api.onrender.com`

### Seed Admin
After first deploy, run in Render Shell:
```bash
npm run seed:admin
```

---

## 3. Frontend Deployment (Netlify)

### Build Settings
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. New site from Git → GitHub
3. Select repository
3. Configure:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`

### Environment Variables
Add in Netlify Site Settings → Environment Variables:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://your-api.onrender.com/api` |

### Deploy
1. Click Deploy
2. Wait for build
3. Note the URL: `https://your-app.netlify.app`

### Custom Domain (Optional)
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

---

## 4. Update CORS (Backend)

After getting Netlify URL, update backend environment:
- `FRONTEND_URL` = `https://your-app.netlify.app`

Redeploy backend.

---

## 5. Verify Deployment

### Test Backend
```bash
curl https://your-api.onrender.com/api/health
```

### Test Frontend
Visit `https://your-app.netlify.app`

### Test Full Flow
1. Register new user
2. Login
3. Add payment methods (all 5 types)
4. Edit/Delete payments
5. Login as admin → check admin dashboard

---

## 6. Production Checklist

- [ ] MongoDB Atlas cluster running
- [ ] Database user created with correct permissions
- [ ] Network access configured (0.0.0.0/0)
- [ ] Backend deployed on Render
- [ ] All backend env vars set
- [ ] Admin user seeded
- [ ] Frontend deployed on Netlify
- [ ] Frontend env var pointing to backend
- [ ] Backend CORS updated with Netlify URL
- [ ] Both services accessible via HTTPS
- [ ] Full user flow tested
- [ ] Admin flow tested
- [ ] No console errors
- [ ] No sensitive data in client bundle

---

## 7. GitHub Repository Setup

### Backend Repo
1. Create new repo: `payment-management-backend`
2. Push backend folder contents
3. Add `.gitignore` (already included)
4. Add README.md

### Frontend Repo
1. Create new repo: `payment-management-frontend`
2. Push frontend folder contents
3. Add `.gitignore` (already included)
4. Add README.md

### Repository Structure
```
payment-management-backend/
├── src/
├── package.json
├── .env.example
├── .gitignore
└── README.md

payment-management-frontend/
├── src/
├── public/
├── package.json
├── vite.config.js
├── .env.example
├── .gitignore
└── README.md
```

---

## 8. Generating Secrets

### JWT Secret
```bash
openssl rand -base64 32
```

### Admin Password
Use a strong password generator or:
```bash
openssl rand -base64 16
```

---

## 9. Troubleshooting

### Backend Issues
- **MongoDB connection failed**: Check URI, network access, credentials
- **CORS errors**: Verify FRONTEND_URL matches exactly (including https)
- **JWT errors**: Ensure JWT_SECRET is set and same across restarts

### Frontend Issues
- **API calls failing**: Check VITE_API_URL, ensure backend is running
- **Build fails**: Check Node version (18+), clear cache
- **Routing issues**: Add `_redirects` file for SPA routing:
  ```
  /*    /index.html   200
  ```

### Common Commands
```bash
# Backend logs
render logs payment-management-api

# Frontend build locally
cd frontend && npm run build

# Test API
curl https://your-api.onrender.com/api/health
```

---

## 10. Monitoring

- Render: View logs in dashboard
- Netlify: View deploy logs and functions
- MongoDB Atlas: Monitor cluster metrics
- Set up alerts for downtime

---

## Support

For issues, check:
1. Render/Netlify deploy logs
2. Browser console for frontend errors
3. MongoDB Atlas metrics
4. Network tab for failed API calls
```

## ./frontend/.env

```
VITE_API_URL=http://localhost:5001/api
```

## ./frontend/.env.production

```
# Production Environment Variables
# Set these in Netlify environment variables

VITE_API_URL=https://your-api.onrender.com/api
```

## ./frontend/.gitignore

```
# Dependencies
node_modules/

# Environment files
.env
.env.local
.env.*.local

# Build output
dist/
build/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Testing
coverage/
.nyc_output/

# Misc
*.pem
.cache/
```

## ./frontend/index.html

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>frontend</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## ./frontend/package.json

```
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.20.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.3"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "oxlint": "^1.79.0",
    "vite": "^8.2.2"
  }
}
```

## ./frontend/README.md

```
# Payment Management System - Frontend

A React/Vite frontend for the Payment Management System with a clean, mobile-first UI.

## Features

- User authentication (Login/Register)
- JWT token management with auto-refresh
- Dashboard with payment method cards
- Add/Edit/Delete payment methods
- Dynamic forms based on payment type
- Admin dashboard with search/filter
- Responsive design (mobile-first)
- Protected routes
- Confirmation dialogs for destructive actions

## Tech Stack

- React 18
- Vite
- React Router v6
- Axios for API calls
- Plain CSS (no Tailwind)

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Top navigation
│   │   ├── PaymentCard.jsx      # Payment display card
│   │   ├── PaymentForm.jsx      # Dynamic payment form
│   │   ├── ProtectedRoute.jsx   # Auth protection
│   │   ├── AdminRoute.jsx       # Admin protection
│   │   ├── Loading.jsx          # Loading spinner
│   │   └── ConfirmDialog.jsx    # Confirmation modal
│   ├── pages/
│   │   ├── Login.jsx            # Login page
│   │   ├── Register.jsx         # Registration page
│   │   ├── Dashboard.jsx        # User dashboard
│   │   ├── AddPayment.jsx       # Add payment page
│   │   ├── EditPayment.jsx      # Edit payment page
│   │   └── AdminDashboard.jsx   # Admin dashboard
│   ├── services/
│   │   └── api.js               # Axios instance & API calls
│   ├── context/
│   │   └── AuthContext.jsx      # Auth state management
│   ├── styles/
│   │   ├── global.css           # Global styles
│   │   ├── auth.css             # Auth page styles
│   │   ├── dashboard.css        # Dashboard styles
│   │   ├── payment.css          # Payment form styles
│   │   └── admin.css            # Admin styles
│   ├── App.jsx                  # Main app with routing
│   └── main.jsx                 # Entry point
├── package.json
├── vite.config.js
├── .env
└── .gitignore
```

## Pages

### Authentication
- `/login` - User login
- `/register` - User registration

### User Panel (Protected)
- `/` - Dashboard with payment list
- `/payments/add` - Add new payment method
- `/payments/edit/:id` - Edit existing payment

### Admin Panel (Admin only)
- `/admin` - Admin dashboard with filters

## Payment Types & Forms

| Type | Icon | Fields |
|------|------|--------|
| Bank | 🏦 | Bank Name, Branch, IFSC, Account Number, Holder Name |
| Paytm | 📱 | Paytm Number |
| UPI | 🔗 | UPI ID |
| PayPal | 💰 | PayPal Email |
| USDT | ₿ | Wallet Address |

## Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:5001/api
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure `.env` with backend API URL

3. Start development server:
```bash
npm run dev
```

## Production Build

```bash
npm run build
```

Output in `dist/` directory.

## Deployment

### Netlify

1. Connect GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variable:
   - `VITE_API_URL` - Your Render backend URL (e.g., `https://your-api.onrender.com/api`)

### Environment Variables for Production

```env
VITE_API_URL=https://your-api.onrender.com/api
```

## Security Features

- JWT tokens stored in localStorage
- Automatic token attachment to requests
- Auto-logout on 401 responses
- Protected routes with redirect
- Admin-only route protection
- Input validation on forms
- No sensitive data in code
- CORS handled by backend

## Responsive Breakpoints

- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Desktop: 769px - 1024px
- Large: 1025px+

## Payment Data Masking

| Type | Display Format |
|------|----------------|
| Bank | •••• •••• 9012 (last 4 digits) |
| Paytm | ********3210 (last 4 digits) |
| USDT | 0x12...5678 (first 4 + last 4) |
| UPI | Full UPI ID (payment identifier) |
| PayPal | Full email (payment identifier) |

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build

## License

MIT
```

## ./frontend/src/App.jsx

```
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddPayment from './pages/AddPayment';
import EditPayment from './pages/EditPayment';
import AdminDashboard from './pages/AdminDashboard';
import './styles/global.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/payment.css';
import './styles/admin.css';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-fullscreen">
        <div className="spinner loading-large"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/payments/add"
        element={
          <ProtectedRoute>
            <AddPayment />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/payments/edit/:id"
        element={
          <ProtectedRoute>
            <EditPayment />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const AppLayout = () => {
  const { user } = useAuth();
  
  return (
    <div className="app">
      {user && <Navbar />}
      <main className="main-content">
        <AppRoutes />
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
```

## ./frontend/src/components/AdminRoute.jsx

```
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-fullscreen">
        <div className="spinner loading-large"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
```

## ./frontend/src/components/ConfirmDialog.jsx

```
import { useEffect } from 'react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'danger' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onCancel}>
            {cancelText}
          </button>
          <button className={`btn ${variant === 'danger' ? 'btn-danger' : 'btn-primary'}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
```

## ./frontend/src/components/Loading.jsx

```
const Loading = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'loading-small',
    medium: 'loading-medium',
    large: 'loading-large',
  };

  return (
    <div className="loading-container">
      <div className={`spinner ${sizeClasses[size]}`}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default Loading;
```

## ./frontend/src/components/Navbar.jsx

```
import { useAuth } from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="brand-link">
          <span className="brand-icon">💳</span>
          <span className="brand-text">Payment Manager</span>
        </NavLink>
      </div>
      
      <div className="navbar-user">
        <span className="user-info">
          <span className="user-avatar">{user.username.charAt(0).toUpperCase()}</span>
          <span className="user-name">{user.username}</span>
          {isAdmin && <span className="admin-badge">Admin</span>}
        </span>
        <button className="btn btn-outline btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
```

## ./frontend/src/components/PaymentCard.jsx

```
import { NavLink } from 'react-router-dom';

const paymentTypeIcons = {
  Bank: '🏦',
  Paytm: '📱',
  UPI: '🔗',
  PayPal: '💰',
  USDT: '₿',
};

const paymentTypeColors = {
  Bank: '#1e88e5',
  Paytm: '#00baf2',
  UPI: '#43a047',
  PayPal: '#0070ba',
  USDT: '#f7931a',
};

const PaymentCard = ({ payment, onEdit, onDelete }) => {
  const icon = paymentTypeIcons[payment.paymentType] || '💳';
  const color = paymentTypeColors[payment.paymentType] || '#666';

  const getDisplayValue = (payment) => {
    switch (payment.paymentType) {
      case 'Bank':
        return payment.maskedAccountNumber || payment.accountNumber;
      case 'Paytm':
        return payment.maskedPaytmNumber || payment.paytmNumber;
      case 'UPI':
        return payment.maskedUpiId || payment.upiId;
      case 'PayPal':
        return payment.maskedPaypalEmail || payment.paypalEmail;
      case 'USDT':
        return payment.maskedUsdtAddress || payment.usdtAddress;
      default:
        return '';
    }
  };

  const getSecondaryInfo = (payment) => {
    switch (payment.paymentType) {
      case 'Bank':
        return `${payment.bankName} • ${payment.branchName}`;
      case 'Paytm':
        return 'Paytm Wallet';
      case 'UPI':
        return 'UPI Payment';
      case 'PayPal':
        return 'PayPal Account';
      case 'USDT':
        return 'USDT Wallet';
      default:
        return '';
    }
  };

  return (
    <div className="payment-card" style={{ borderLeftColor: color }}>
      <div className="payment-card-header">
        <span className="payment-type-badge" style={{ backgroundColor: color }}>
          {icon} {payment.paymentType}
        </span>
      </div>
      <div className="payment-card-body">
        <div className="payment-main-value">{getDisplayValue(payment)}</div>
        <div className="payment-secondary-info">{getSecondaryInfo(payment)}</div>
      </div>
      <div className="payment-card-actions">
        <NavLink to={`/payments/edit/${payment._id}`} className="btn btn-sm btn-outline" onClick={onEdit}>
          Edit
        </NavLink>
        <button className="btn btn-sm btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
```

## ./frontend/src/components/PaymentForm.jsx

```
import { useState, useEffect } from 'react';

const paymentFields = {
  Bank: [
    { name: 'bankName', label: 'Bank Name', type: 'text', required: true, placeholder: 'e.g., HDFC Bank' },
    { name: 'branchName', label: 'Branch Name', type: 'text', required: true, placeholder: 'e.g., Koramangala Branch' },
    { name: 'ifscCode', label: 'IFSC Code', type: 'text', required: true, placeholder: 'e.g., HDFC0001234' },
    { name: 'accountNumber', label: 'Account Number', type: 'text', required: true, placeholder: 'e.g., 1234567890' },
    { name: 'accountHolderName', label: 'Account Holder Name', type: 'text', required: true, placeholder: 'e.g., John Doe' },
  ],
  Paytm: [
    { name: 'paytmNumber', label: 'Paytm Number', type: 'tel', required: true, placeholder: 'e.g., 9876543210' },
  ],
  UPI: [
    { name: 'upiId', label: 'UPI ID', type: 'text', required: true, placeholder: 'e.g., user@upi' },
  ],
  PayPal: [
    { name: 'paypalEmail', label: 'PayPal Email', type: 'email', required: true, placeholder: 'e.g., user@example.com' },
  ],
  USDT: [
    { name: 'usdtAddress', label: 'USDT Wallet Address', type: 'text', required: true, placeholder: 'e.g., 0x1234...abcd' },
  ],
};

const paymentTypes = [
  { value: 'Bank', label: '🏦 Bank', description: 'Bank account with IFSC code' },
  { value: 'Paytm', label: '📱 Paytm', description: 'Paytm wallet number' },
  { value: 'UPI', label: '🔗 UPI', description: 'UPI ID (user@bank)' },
  { value: 'PayPal', label: '💰 PayPal', description: 'PayPal email address' },
  { value: 'USDT', label: '₿ USDT', description: 'USDT wallet address (TRC20/ERC20)' },
];

const PaymentForm = ({ initialData, onSubmit, loading, submitText = 'Save' }) => {
  const [paymentType, setPaymentType] = useState(initialData?.paymentType || 'Bank');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setPaymentType(initialData.paymentType);
      const fields = paymentFields[initialData.paymentType] || [];
      const data = {};
      fields.forEach(field => {
        data[field.name] = initialData[field.name] || '';
      });
      setFormData(data);
    }
  }, [initialData]);

  useEffect(() => {
    setFormData({});
  }, [paymentType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = paymentFields[paymentType] || [];
    
    fields.forEach(field => {
      const value = formData[field.name];
      if (field.required && (!value || value.trim() === '')) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === 'email' && value && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        newErrors[field.name] = 'Please enter a valid email';
      }
      if (field.name === 'ifscCode' && value && !/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(value)) {
        newErrors[field.name] = 'Invalid IFSC code format';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    onSubmit({
      paymentType,
      ...formData,
    });
  };

  const currentFields = paymentFields[paymentType] || [];

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-section">
        <label className="form-label">Payment Type</label>
        <div className="payment-type-selector">
          {paymentTypes.map(type => (
            <button
              key={type.value}
              type="button"
              className={`payment-type-option ${paymentType === type.value ? 'selected' : ''}`}
              onClick={() => setPaymentType(type.value)}
            >
              <span className="payment-type-icon">{type.label.split(' ')[0]}</span>
              <div className="payment-type-info">
                <span className="payment-type-name">{type.label.split(' ').slice(1).join(' ')}</span>
                <span className="payment-type-desc">{type.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {currentFields.map(field => (
        <div key={field.name} className="form-group">
          <label htmlFor={field.name} className="form-label">
            {field.label} {field.required && <span className="required">*</span>}
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={`form-input ${errors[field.name] ? 'error' : ''}`}
            disabled={loading}
          />
          {errors[field.name] && <span className="error-message">{errors[field.name]}</span>}
        </div>
      ))}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
```

## ./frontend/src/components/ProtectedRoute.jsx

```
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-fullscreen">
        <div className="spinner loading-large"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

## ./frontend/src/context/AuthContext.jsx

```
import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    
    initAuth();
  }, []);

  const login = async (email, password) => {
    const response = await authAPI.login({ email, password });
    const { user, token } = response.data.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    
    return response.data;
  };

  const register = async (username, email, password) => {
    const response = await authAPI.register({ username, email, password });
    const { user, token } = response.data.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

## ./frontend/src/main.jsx

```
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## ./frontend/src/pages/AddPayment.jsx

```
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { paymentAPI } from '../services/api';
import PaymentForm from '../components/PaymentForm';
import Loading from '../components/Loading';

const AddPayment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data) => {
    setError('');
    setLoading(true);

    try {
      await paymentAPI.create(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add payment method');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form-page">
      <div className="page-header">
        <Link to="/" className="btn btn-back">← Back</Link>
        <h1>Add Payment Method</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-card">
        <PaymentForm onSubmit={handleSubmit} loading={loading} submitText="Add Payment Method" />
      </div>
    </div>
  );
};

export default AddPayment;
```

## ./frontend/src/pages/AdminDashboard.jsx

```
import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import Loading from '../components/Loading';

const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ totalUsers: 0, totalPayments: 0, byType: [] });
  
  const [filters, setFilters] = useState({
    username: '',
    paymentType: '',
    bankName: '',
    ifscCode: '',
    paytmNumber: '',
    upiId: '',
    paypalEmail: '',
    usdtAddress: '',
  });
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const params = { ...filters, page: pagination.page, limit: pagination.limit };
      Object.keys(params).forEach(key => params[key] === '' && delete params[key]);
      
      const response = await adminAPI.getAllPayments(params);
      setPayments(response.data.data.payments);
      setPagination(prev => ({ ...prev, ...response.data.data.pagination }));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data.data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchStats();
  }, [filters, pagination.page]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const paymentTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'Bank', label: '🏦 Bank' },
    { value: 'Paytm', label: '📱 Paytm' },
    { value: 'UPI', label: '🔗 UPI' },
    { value: 'PayPal', label: '💰 PayPal' },
    { value: 'USDT', label: '₿ USDT' },
  ];

  if (loading) {
    return <Loading message="Loading admin dashboard..." />;
  }

  const getDisplayValue = (payment) => {
    switch (payment.paymentType) {
      case 'Bank':
        return payment.maskedAccountNumber || payment.accountNumber;
      case 'Paytm':
        return payment.maskedPaytmNumber || payment.paytmNumber;
      case 'UPI':
        return payment.maskedUpiId || payment.upiId;
      case 'PayPal':
        return payment.maskedPaypalEmail || payment.paypalEmail;
      case 'USDT':
        return payment.maskedUsdtAddress || payment.usdtAddress;
      default:
        return '';
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage all users' payment information</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-value">{stats.totalUsers}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalPayments}</div>
          <div className="stat-label">Total Payments</div>
        </div>
        {stats.byType.map(item => (
          <div key={item._id} className="stat-card">
            <div className="stat-value">{item.count}</div>
            <div className="stat-label">{item._id}</div>
          </div>
        ))}
      </div>

      <div className="admin-filters">
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="username" className="filter-label">Username</label>
            <input
              type="text"
              id="username"
              value={filters.username}
              onChange={(e) => handleFilterChange('username', e.target.value)}
              placeholder="Search username..."
              className="form-input"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="paymentType" className="filter-label">Payment Type</label>
            <select
              id="paymentType"
              value={filters.paymentType}
              onChange={(e) => handleFilterChange('paymentType', e.target.value)}
              className="form-input"
            >
              {paymentTypeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-row advanced-filters">
          <div className="filter-group">
            <label htmlFor="bankName" className="filter-label">Bank Name</label>
            <input
              type="text"
              id="bankName"
              value={filters.bankName}
              onChange={(e) => handleFilterChange('bankName', e.target.value)}
              placeholder="Bank name..."
              className="form-input"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="ifscCode" className="filter-label">IFSC Code</label>
            <input
              type="text"
              id="ifscCode"
              value={filters.ifscCode}
              onChange={(e) => handleFilterChange('ifscCode', e.target.value)}
              placeholder="IFSC..."
              className="form-input"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="paytmNumber" className="filter-label">Paytm Number</label>
            <input
              type="text"
              id="paytmNumber"
              value={filters.paytmNumber}
              onChange={(e) => handleFilterChange('paytmNumber', e.target.value)}
              placeholder="Paytm number..."
              className="form-input"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="upiId" className="filter-label">UPI ID</label>
            <input
              type="text"
              id="upiId"
              value={filters.upiId}
              onChange={(e) => handleFilterChange('upiId', e.target.value)}
              placeholder="UPI ID..."
              className="form-input"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="paypalEmail" className="filter-label">PayPal Email</label>
            <input
              type="text"
              id="paypalEmail"
              value={filters.paypalEmail}
              onChange={(e) => handleFilterChange('paypalEmail', e.target.value)}
              placeholder="PayPal email..."
              className="form-input"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="usdtAddress" className="filter-label">USDT Address</label>
            <input
              type="text"
              id="usdtAddress"
              value={filters.usdtAddress}
              onChange={(e) => handleFilterChange('usdtAddress', e.target.value)}
              placeholder="USDT address..."
              className="form-input"
            />
          </div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {payments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h2>No payment methods found</h2>
          <p>Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Payment Type</th>
                  <th>Details</th>
                  <th>Date Added</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment._id}>
                    <td>
                      <div className="user-cell">
                        <span className="user-avatar-small">{payment.user?.username?.charAt(0).toUpperCase()}</span>
                        <span>{payment.user?.username}</span>
                      </div>
                    </td>
                    <td>
                      <span className="payment-type-badge-small">{payment.paymentType}</span>
                    </td>
                    <td className="payment-details">{getDisplayValue(payment)}</td>
                    <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.pages > 1 && (
            <div className="pagination">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {pagination.page} of {pagination.pages} ({pagination.total} total)
              </span>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
```

## ./frontend/src/pages/Dashboard.jsx

```
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { paymentAPI } from '../services/api';
import PaymentCard from '../components/PaymentCard';
import Loading from '../components/Loading';
import ConfirmDialog from '../components/ConfirmDialog';

const Dashboard = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, payment: null });

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await paymentAPI.getAll();
      setPayments(response.data.data.payments);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load payment methods');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleDelete = async (paymentId) => {
    try {
      await paymentAPI.delete(paymentId);
      setPayments(prev => prev.filter(p => p._id !== paymentId));
      setDeleteDialog({ open: false, payment: null });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete payment method');
    }
  };

  const openDeleteDialog = (payment) => {
    setDeleteDialog({ open: true, payment });
  };

  if (loading) {
    return <Loading message="Loading your payment methods..." />;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Payment Methods</h1>
          <p className="welcome-text">Welcome back, {user?.username}!</p>
        </div>
        <Link to="/payments/add" className="btn btn-primary">
          + Add Payment Method
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {payments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💳</div>
          <h2>No payment methods yet</h2>
          <p>Add your first payment method to get started</p>
          <Link to="/payments/add" className="btn btn-primary">
            Add Payment Method
          </Link>
        </div>
      ) : (
        <div className="payments-grid">
          {payments.map(payment => (
            <PaymentCard
              key={payment._id}
              payment={payment}
              onEdit={() => {}}
              onDelete={() => openDeleteDialog(payment)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteDialog.open}
        title="Delete Payment Method"
        message={`Are you sure you want to delete this ${deleteDialog.payment?.paymentType} payment method? This action cannot be undone.`}
        onConfirm={() => handleDelete(deleteDialog.payment._id)}
        onCancel={() => setDeleteDialog({ open: false, payment: null })}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Dashboard;
```

## ./frontend/src/pages/EditPayment.jsx

```
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { paymentAPI } from '../services/api';
import PaymentForm from '../components/PaymentForm';
import Loading from '../components/Loading';

const EditPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await paymentAPI.getAll();
        const found = response.data.data.payments.find(p => p._id === id);
        if (found) {
          setPayment(found);
        } else {
          setError('Payment method not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load payment method');
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();
  }, [id]);

  const handleSubmit = async (data) => {
    setError('');
    setSaving(true);

    try {
      await paymentAPI.update(id, data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update payment method');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading message="Loading payment method..." />;
  }

  if (!payment) {
    return (
      <div className="payment-form-page">
        <div className="alert alert-error">{error || 'Payment method not found'}</div>
        <Link to="/" className="btn btn-primary">← Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="payment-form-page">
      <div className="page-header">
        <Link to="/" className="btn btn-back">← Back</Link>
        <h1>Edit Payment Method</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-card">
        <PaymentForm
          initialData={payment}
          onSubmit={handleSubmit}
          loading={saving}
          submitText="Save Changes"
        />
      </div>
    </div>
  );
};

export default EditPayment;
```

## ./frontend/src/pages/Login.jsx

```
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">💳</div>
          <h1>Welcome Back</h1>
          <p>Sign in to manage your payment methods</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="you@example.com"
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
```

## ./frontend/src/pages/Register.jsx

```
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">💳</div>
          <h1>Create Account</h1>
          <p>Start managing your payment methods securely</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="johndoe"
              required
              disabled={loading}
              autoComplete="username"
              minLength={3}
              maxLength={30}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="you@example.com"
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
              disabled={loading}
              autoComplete="new-password"
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
```

## ./frontend/src/services/api.js

```
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const paymentAPI = {
  create: (data) => api.post('/payments', data),
  getAll: () => api.get('/payments'),
  update: (id, data) => api.put(`/payments/${id}`, data),
  delete: (id) => api.delete(`/payments/${id}`),
};

export const adminAPI = {
  getAllPayments: (params) => api.get('/admin/payments', { params }),
  getStats: () => api.get('/admin/stats'),
};

export default api;
```

## ./frontend/src/styles/admin.css

```
/* Admin styles are included in global.css */
```

## ./frontend/src/styles/auth.css

```
/* Auth page styles are included in global.css */
```

## ./frontend/src/styles/dashboard.css

```
/* Dashboard styles are included in global.css */
```

## ./frontend/src/styles/global.css

```
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --primary-light: #dbeafe;
  --danger: #dc2626;
  --danger-hover: #b91c1c;
  --success: #16a34a;
  --warning: #f59e0b;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-tertiary: #f3f4f6;
  --border: #e5e7eb;
  --border-focus: #2563eb;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --radius-sm: 4px;
  --radius: 8px;
  --radius-lg: 12px;
  --transition: 150ms ease;
}

html {
  font-size: 16px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 1.5rem 1rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition);
  text-decoration: none;
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--primary-hover);
  border-color: var(--primary-hover);
}

.btn-secondary {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--bg-tertiary);
  border-color: var(--text-muted);
}

.btn-outline {
  background-color: transparent;
  color: var(--primary);
  border-color: var(--primary);
}

.btn-outline:hover:not(:disabled) {
  background-color: var(--primary-light);
}

.btn-danger {
  background-color: var(--danger);
  color: white;
  border-color: var(--danger);
}

.btn-danger:hover:not(:disabled) {
  background-color: var(--danger-hover);
  border-color: var(--danger-hover);
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
}

.btn-full {
  width: 100%;
}

.btn-back {
  color: var(--text-secondary);
  background: transparent;
  border: none;
  padding: 0.5rem;
  font-size: 0.875rem;
}

.btn-back:hover {
  color: var(--text-primary);
  background-color: var(--bg-tertiary);
}

/* Form Elements */
.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.required {
  color: var(--danger);
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: all var(--transition);
}

.form-input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.form-input.error {
  border-color: var(--danger);
}

.form-input.error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-input:disabled {
  background-color: var(--bg-tertiary);
  cursor: not-allowed;
}

.error-message {
  display: block;
  margin-top: 0.375rem;
  font-size: 0.8125rem;
  color: var(--danger);
}

/* Alerts */
.alert {
  padding: 0.875rem 1rem;
  border-radius: var(--radius);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.alert-error {
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.alert-success {
  background-color: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
}

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.loading-fullscreen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
  z-index: 100;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spinner.loading-small {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.spinner.loading-large {
  width: 48px;
  height: 48px;
  border-width: 4px;
}

.loading-message {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 400px;
  animation: slideUp 0.2s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border);
}

.modal-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.empty-state p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

/* Page Header */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

/* Form Card */
.form-card {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

/* Auth Pages */
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.auth-container {
  width: 100%;
  max-width: 420px;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  box-shadow: var(--shadow);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-logo {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.auth-header h1 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: var(--text-secondary);
}

.auth-form {
  margin-bottom: 1.5rem;
}

.auth-footer {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.auth-footer a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.auth-footer a:hover {
  text-decoration: underline;
}

/* Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 50;
}

.navbar-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text-primary);
}

.brand-icon {
  font-size: 1.5rem;
}

.brand-text {
  font-size: 1.125rem;
  font-weight: 600;
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-name {
  font-weight: 500;
  font-size: 0.875rem;
}

.admin-badge {
  background: var(--warning);
  color: #78350f;
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Dashboard */
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.welcome-text {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.payments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

/* Payment Card */
.payment-card {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-left-width: 4px;
  border-radius: var(--radius);
  padding: 1.25rem;
  transition: all var(--transition);
}

.payment-card:hover {
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.payment-card-header {
  margin-bottom: 0.75rem;
}

.payment-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  border-radius: 9999px;
  text-transform: capitalize;
}

.payment-card-body {
  margin-bottom: 1rem;
}

.payment-main-value {
  font-size: 1.125rem;
  font-weight: 600;
  font-family: 'SF Mono', 'Fira Code', monospace;
  margin-bottom: 0.25rem;
  word-break: break-all;
}

.payment-secondary-info {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.payment-card-actions {
  display: flex;
  gap: 0.5rem;
}

/* Payment Form */
.payment-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.payment-type-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
}

.payment-type-option {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 1rem;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
  cursor: pointer;
  transition: all var(--transition);
  text-align: left;
}

.payment-type-option:hover {
  border-color: var(--primary);
}

.payment-type-option.selected {
  border-color: var(--primary);
  background: var(--primary-light);
}

.payment-type-icon {
  font-size: 1.5rem;
}

.payment-type-name {
  font-weight: 600;
  font-size: 0.875rem;
}

.payment-type-desc {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

/* Admin */
.admin-header {
  margin-bottom: 1.5rem;
}

.admin-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.admin-header p {
  color: var(--text-secondary);
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  line-height: 1.2;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.admin-filters {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-row:last-child {
  margin-bottom: 0;
}

.filter-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.375rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.admin-table-container {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th,
.admin-table td {
  padding: 1rem 1.25rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.admin-table th {
  background: var(--bg-tertiary);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.admin-table td {
  font-size: 0.875rem;
}

.admin-table tbody tr:last-child td {
  border-bottom: none;
}

.admin-table tbody tr:hover {
  background: var(--bg-secondary);
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-avatar-small {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
}

.payment-type-badge-small {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: var(--radius-sm);
  background: var(--primary-light);
  color: var(--primary);
}

.payment-details {
  font-family: 'SF Mono', 'Fira Code', monospace;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  flex-wrap: wrap;
}

.pagination-info {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
  
  .navbar {
    padding: 0.75rem 1rem;
  }
  
  .brand-text {
    display: none;
  }
  
  .user-name {
    display: none;
  }
  
  .auth-container {
    padding: 1.5rem;
  }
  
  .payment-type-selector {
    grid-template-columns: 1fr;
  }
  
  .payment-card-actions {
    flex-direction: column;
  }
  
  .payment-card-actions .btn {
    width: 100%;
  }
  
  .filter-row {
    grid-template-columns: 1fr;
  }
  
  .admin-table-container {
    overflow-x: auto;
  }
  
  .admin-table {
    min-width: 600px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0.75rem 0.5rem;
  }
  
  .auth-container {
    padding: 1.25rem;
  }
  
  .form-card {
    padding: 1rem;
  }
  
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .stats-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## ./frontend/src/styles/payment.css

```
/* Payment form styles are included in global.css */
```

## ./frontend/vite.config.js

```
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

