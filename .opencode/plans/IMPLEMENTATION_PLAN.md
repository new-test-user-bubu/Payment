# Multiple Payment Information Management System - Implementation Plan

## Project Overview
Build a full-stack payment information management system with React (Vite) frontend, Node.js/Express backend, and MongoDB database. Users can manage multiple payment methods (Bank, Paytm, UPI, PayPal, USDT) with role-based access control (user/admin).

---

## Phase 1: Project Initialization
- [ ] Create backend folder structure
- [ ] Create frontend folder structure
- [ ] Initialize package.json for both
- [ ] Set up .gitignore and .env files
- [ ] Configure ESLint/Prettier (optional)

### Backend Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── paymentController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── PaymentMethod.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── validators/
│   │   ├── authValidator.js
│   │   └── paymentValidator.js
│   ├── app.js
│   └── server.js
├── package.json
├── .env
└── .gitignore
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PaymentCard.jsx
│   │   ├── PaymentForm.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── AdminRoute.jsx
│   │   ├── Loading.jsx
│   │   └── ConfirmDialog.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AddPayment.jsx
│   │   ├── EditPayment.jsx
│   │   └── AdminDashboard.jsx
│   ├── services/
│   │   └── api.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   ├── payment.css
│   │   └── admin.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── .env
└── .gitignore
```

---

## Phase 2: MongoDB Connection
- [ ] Install mongoose
- [ ] Create db.js with connection logic
- [ ] Handle connection events (connected, error, disconnected)
- [ ] Add to .env: MONGODB_URI

---

## Phase 3: User Model
- [ ] Create User schema with: username, email, password, role
- [ ] Email unique index
- [ ] Role enum: ['user', 'admin']
- [ ] Password field (will store bcrypt hash)
- [ ] Timestamps

---

## Phase 4: PaymentMethod Model
- [ ] Create PaymentMethod schema with:
  - user (ref: User, required)
  - paymentType (enum: ['Bank', 'Paytm', 'UPI', 'PayPal', 'USDT'])
  - Bank fields: ifscCode, branchName, bankName, accountNumber, accountHolderName
  - Paytm field: paytmNumber
  - UPI field: upiId
  - PayPal field: paypalEmail
  - USDT field: usdtAddress
- [ ] Conditional validation based on paymentType
- [ ] Index on user + paymentType for queries

---

## Phase 5: Authentication
- [ ] Install bcryptjs, jsonwebtoken
- [ ] POST /api/auth/register
  - Validate input (username, email, password)
  - Check duplicate email
  - Hash password with bcrypt (12 rounds)
  - Create user with role: 'user'
  - Generate JWT token
  - Return user data (without password) + token
- [ ] POST /api/auth/login
  - Validate input (email, password)
  - Find user by email
  - Compare password with bcrypt
  - Generate JWT token
  - Return user data + token
- [ ] Error handling for validation, duplicate, invalid credentials

---

## Phase 6: JWT Middleware
- [ ] authMiddleware.js
  - Verify JWT from Authorization header
  - Attach user to req.user
  - Handle expired/invalid tokens
- [ ] adminMiddleware.js
  - Check req.user.role === 'admin'
  - Return 403 if not admin
- [ ] errorMiddleware.js
  - Centralized error handling
  - Consistent error response format

---

## Phase 7: User Payment APIs
- [ ] POST /api/payments (Create)
  - Validate payment type and conditional fields
  - Associate with authenticated user
  - Return created payment method
- [ ] GET /api/payments (List)
  - Return only authenticated user's payments
  - Populate user info if needed
- [ ] PUT /api/payments/:id (Update)
  - Verify ownership
  - Validate conditional fields
  - Update and return
- [ ] DELETE /api/payments/:id (Delete)
  - Verify ownership
  - Delete and return success

### Conditional Validation Rules:
| Payment Type | Required Fields |
|--------------|-----------------|
| Bank | ifscCode, branchName, bankName, accountNumber, accountHolderName |
| Paytm | paytmNumber |
| UPI | upiId |
| PayPal | paypalEmail |
| USDT | usdtAddress |

---

## Phase 8: Admin APIs
- [ ] GET /api/admin/payments
  - Protected by adminMiddleware
  - Query params for filtering:
    - username (partial match)
    - paymentType
    - bankName
    - ifscCode
    - paytmNumber
    - upiId
    - paypalEmail
    - usdtAddress
  - Populate user (username, email)
  - Pagination support (page, limit)
  - Return payments with user info

---

## Phase 9: Backend Testing
- [ ] Test all auth endpoints
- [ ] Test payment CRUD with ownership checks
- [ ] Test admin endpoints with filters
- [ ] Test error cases (401, 403, 404, 400)
- [ ] Verify JWT expiration handling

---

## Phase 10: React Setup
- [ ] Create Vite React project
- [ ] Install dependencies: react-router-dom, axios
- [ ] Set up folder structure
- [ ] Configure API base URL via VITE_API_URL
- [ ] Create global styles

---

## Phase 11: Authentication UI
- [ ] AuthContext for state management
- [ ] Login page with form validation
- [ ] Register page with form validation
- [ ] ProtectedRoute component
- [ ] AdminRoute component
- [ ] Navbar with user info, logout
- [ ] Token storage (localStorage)
- [ ] Axios interceptor for auth header

---

## Phase 12: User Dashboard
- [ ] Welcome section with user info
- [ ] Payment methods list (cards)
- [ ] Empty state when no payments
- [ ] "Add Payment" button
- [ ] Responsive grid layout

---

## Phase 13: Payment Forms
- [ ] PaymentForm component (shared for Add/Edit)
- [ ] Payment type selector (radio/buttons)
- [ ] Dynamic field rendering based on paymentType
- [ ] Form validation (required fields, email format)
- [ ] Submit handling with loading state
- [ ] Success/error feedback

### Field Mapping:
- Bank: bankName, branchName, ifscCode, accountNumber, accountHolderName
- Paytm: paytmNumber
- UPI: upiId
- PayPal: paypalEmail
- USDT: usdtAddress

---

## Phase 14: Edit/Delete Payment
- [ ] EditPayment page (pre-fills form)
- [ ] Delete confirmation dialog
- [ ] Ownership verification on frontend (backend also checks)
- [ ] Update UI after operations

---

## Phase 15: Admin Dashboard
- [ ] Admin-only access check
- [ ] Search/filter controls:
  - Text search (username)
  - Dropdown for paymentType
  - Text inputs for specific fields
- [ ] Results table with: Username, Payment Type, Details
- [ ] Pagination
- [ ] Responsive table/card view

---

## Phase 16: Responsive Styling
- [ ] Mobile-first CSS
- [ ] Breakpoints: 320px, 375px, 768px, 1024px, 1440px
- [ ] Card-based layout for payments
- [ ] Form layouts that work on mobile
- [ ] Admin table → card view on mobile
- [ ] No horizontal overflow
- [ ] Touch-friendly buttons/inputs

---

## Phase 17: Full Integration Testing
- [ ] End-to-end user flow: register → login → add/edit/delete payments
- [ ] Admin flow: login as admin → view all → search/filter
- [ ] Security tests: cross-user access blocked
- [ ] Validation tests: all payment types
- [ ] Responsive tests on multiple viewports

---

## Phase 18: Deployment Preparation
- [ ] Production .env files
- [ ] CORS configuration for deployed domains
- [ ] Build scripts
- [ ] Frontend: VITE_API_URL for production
- [ ] Backend: PORT, MONGODB_URI, JWT_SECRET
- [ ] Verify no secrets in code

---

## Phase 19: Production Testing
- [ ] Deploy backend (Vercel/Render/Railway)
- [ ] Deploy frontend (Netlify/Vercel)
- [ ] Configure MongoDB Atlas
- [ ] Test production URLs
- [ ] Verify CORS works

---

## Phase 20: README and GitHub Cleanup
- [ ] Create comprehensive README for each repo
- [ ] Document setup, env vars, API endpoints
- [ ] Add screenshots section
- [ ] Admin seeding instructions
- [ ] Push to GitHub (two repos)

---

## Phase 21: Optional React Native Bonus (Only if time permits)
- [ ] Create React Native CLI project
- [ ] Implement user panel screens
- [ ] Share API service with web
- [ ] Test on Android emulator

---

## API Endpoints Summary

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Payments (User)
- POST /api/payments
- GET /api/payments
- PUT /api/payments/:id
- DELETE /api/payments/:id

### Admin
- GET /api/admin/payments?username=&paymentType=&bankName=&ifscCode=&paytmNumber=&upiId=&paypalEmail=&usdtAddress=&page=&limit=

---

## Database Schema Summary

### User
```javascript
{
  username: String, required
  email: String, required, unique
  password: String, required (bcrypt hash)
  role: String, enum: ['user', 'admin'], default: 'user'
  createdAt, updatedAt: Date
}
```

### PaymentMethod
```javascript
{
  user: ObjectId, ref: 'User', required
  paymentType: String, enum: ['Bank', 'Paytm', 'UPI', 'PayPal', 'USDT'], required
  // Bank
  ifscCode: String,
  branchName: String,
  bankName: String,
  accountNumber: String,
  accountHolderName: String,
  // Paytm
  paytmNumber: String,
  // UPI
  upiId: String,
  // PayPal
  paypalEmail: String,
  // USDT
  usdtAddress: String,
  createdAt, updatedAt: Date
}
```

---

## Key Implementation Decisions

1. **Conditional Validation**: Use Mongoose validators with custom functions that check paymentType
2. **Security**: Never expose full sensitive data in API responses; mask in UI
3. **Error Format**: Consistent `{ success, message, data }` for success, `{ success, message }` for errors
4. **Token Storage**: localStorage with axios interceptor
5. **Admin Seeding**: npm script using env vars for credentials

---

## Questions for Clarification

1. **MongoDB**: Should I use a local MongoDB or MongoDB Atlas URI for development?
2. **Port**: Preferred backend port (default 5000)?
3. **JWT Expiry**: Token expiration time (e.g., 7d, 24h)?
4. **Admin Seeding**: Should I create a seed script or manual DB entry?
5. **Deployment Targets**: Preferred hosting platforms (Vercel/Netlify/Render/Railway)?
6. **Payment Masking**: Specific masking rules (e.g., last 4 digits only)?
