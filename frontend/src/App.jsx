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
