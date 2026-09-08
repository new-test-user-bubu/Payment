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
