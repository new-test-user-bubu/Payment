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

> **Note for macOS users:** The backend runs on port 5001 by default because port 5000 is reserved by macOS for AirPlay Receiver. If your backend runs on a different port, update `VITE_API_URL` accordingly (e.g., `http://localhost:5000/api`).

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
