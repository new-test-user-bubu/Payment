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
        {isAdmin && (
          <NavLink to="/admin" className="btn btn-outline btn-sm">
            Admin Panel
          </NavLink>
        )}
        <button className="btn btn-outline btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
