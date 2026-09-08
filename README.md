# Multiple Payment Information Management System

## Overview
Full-stack payment information management system built using:
- React
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Features

### User
- Registration
- Login
- JWT authentication
- Add multiple payment methods
- View payment methods
- Edit payment methods
- Delete payment methods

### Supported Payment Types
- Bank
- Paytm
- UPI
- PayPal
- USDT

### Admin
- Admin authentication/authorization
- View all users' payment information
- Search users
- Filter by payment type
- Filter by Bank Name
- Filter by IFSC Code
- Filter by Paytm Number
- Filter by UPI ID
- Filter by PayPal Email
- Filter by USDT Address

### Security
- bcrypt password hashing
- JWT authentication
- role-based admin authorization
- ownership protection
- sensitive payment information masking
- environment variables for secrets

## Project Structure

frontend/
backend/

## Local Setup

### Backend
1. Navigate to the `backend` directory.
2. Run `npm install` to install dependencies.
3. Set up your `.env` file based on `.env.example`.
4. Run `npm run seed:admin` to create the default admin user.
5. Run `npm run dev` to start the backend development server on port 5001.

### Frontend
1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. Set up your `.env` file based on `.env.example`.
4. Run `npm run dev` to start the React application on port 5173.
