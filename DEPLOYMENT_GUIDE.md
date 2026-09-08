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
