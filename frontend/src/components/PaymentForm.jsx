import { useState, useEffect } from 'react';

const paymentFields = {
  Bank: [
    { name: 'bankName', label: 'Bank Name', type: 'text', required: true, placeholder: 'e.g., HDFC Bank' },
    { name: 'branchName', label: 'Branch Name', type: 'text', required: true, placeholder: 'e.g., Koramangala Branch' },
    { name: 'ifscCode', label: 'IFSC Code', type: 'text', required: true, placeholder: 'e.g., HDFC0001234' },
    { name: 'accountNumber', label: 'Account Number', type: 'text', required: true, placeholder: 'e.g., 1234567890' },
    { name: 'accountHolderName', label: 'Account Holder Name', type: 'text', required: true, placeholder: 'e.g., John Doe' },
  ],
  Paytm: [
    { name: 'paytmNumber', label: 'Paytm Number', type: 'tel', required: true, placeholder: 'e.g., 9876543210' },
  ],
  UPI: [
    { name: 'upiId', label: 'UPI ID', type: 'text', required: true, placeholder: 'e.g., user@upi' },
  ],
  PayPal: [
    { name: 'paypalEmail', label: 'PayPal Email', type: 'email', required: true, placeholder: 'e.g., user@example.com' },
  ],
  USDT: [
    { name: 'usdtAddress', label: 'USDT Wallet Address', type: 'text', required: true, placeholder: 'e.g., 0x1234...abcd' },
  ],
};

const paymentTypes = [
  { value: 'Bank', label: '🏦 Bank', description: 'Bank account with IFSC code' },
  { value: 'Paytm', label: '📱 Paytm', description: 'Paytm wallet number' },
  { value: 'UPI', label: '🔗 UPI', description: 'UPI ID (user@bank)' },
  { value: 'PayPal', label: '💰 PayPal', description: 'PayPal email address' },
  { value: 'USDT', label: '₿ USDT', description: 'USDT wallet address (TRC20/ERC20)' },
];

const PaymentForm = ({ initialData, onSubmit, loading, submitText = 'Save' }) => {
  const [paymentType, setPaymentType] = useState(initialData?.paymentType || 'Bank');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setPaymentType(initialData.paymentType);
      const fields = paymentFields[initialData.paymentType] || [];
      const data = {};
      fields.forEach(field => {
        data[field.name] = initialData[field.name] || '';
      });
      setFormData(data);
    }
  }, [initialData]);

  useEffect(() => {
    setFormData({});
  }, [paymentType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = paymentFields[paymentType] || [];
    
    fields.forEach(field => {
      const value = formData[field.name];
      if (field.required && (!value || value.trim() === '')) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === 'email' && value && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        newErrors[field.name] = 'Please enter a valid email';
      }
      if (field.name === 'ifscCode' && value && !/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(value)) {
        newErrors[field.name] = 'Invalid IFSC code format';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    onSubmit({
      paymentType,
      ...formData,
    });
  };

  const currentFields = paymentFields[paymentType] || [];

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-section">
        <label className="form-label">Payment Type</label>
        <div className="payment-type-selector">
          {paymentTypes.map(type => (
            <button
              key={type.value}
              type="button"
              className={`payment-type-option ${paymentType === type.value ? 'selected' : ''}`}
              onClick={() => setPaymentType(type.value)}
            >
              <span className="payment-type-icon">{type.label.split(' ')[0]}</span>
              <div className="payment-type-info">
                <span className="payment-type-name">{type.label.split(' ').slice(1).join(' ')}</span>
                <span className="payment-type-desc">{type.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {currentFields.map(field => (
        <div key={field.name} className="form-group">
          <label htmlFor={field.name} className="form-label">
            {field.label} {field.required && <span className="required">*</span>}
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={`form-input ${errors[field.name] ? 'error' : ''}`}
            disabled={loading}
          />
          {errors[field.name] && <span className="error-message">{errors[field.name]}</span>}
        </div>
      ))}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
