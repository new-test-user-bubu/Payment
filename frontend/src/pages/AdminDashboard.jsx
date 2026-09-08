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
