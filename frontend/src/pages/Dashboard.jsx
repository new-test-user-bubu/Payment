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
