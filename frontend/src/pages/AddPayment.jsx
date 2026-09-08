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
