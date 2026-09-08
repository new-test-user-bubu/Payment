import { NavLink } from 'react-router-dom';

const paymentTypeIcons = {
  Bank: '🏦',
  Paytm: '📱',
  UPI: '🔗',
  PayPal: '💰',
  USDT: '₿',
};

const paymentTypeColors = {
  Bank: '#1e88e5',
  Paytm: '#00baf2',
  UPI: '#43a047',
  PayPal: '#0070ba',
  USDT: '#f7931a',
};

const PaymentCard = ({ payment, onDelete }) => {
  const icon = paymentTypeIcons[payment.paymentType] || '💳';
  const color = paymentTypeColors[payment.paymentType] || '#666';

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

  const getSecondaryInfo = (payment) => {
    switch (payment.paymentType) {
      case 'Bank':
        return `${payment.bankName} • ${payment.branchName}`;
      case 'Paytm':
        return 'Paytm Wallet';
      case 'UPI':
        return 'UPI Payment';
      case 'PayPal':
        return 'PayPal Account';
      case 'USDT':
        return 'USDT Wallet';
      default:
        return '';
    }
  };

  return (
    <div className="payment-card" style={{ borderLeftColor: color }}>
      <div className="payment-card-header">
        <span className="payment-type-badge" style={{ backgroundColor: color }}>
          {icon} {payment.paymentType}
        </span>
      </div>
      <div className="payment-card-body">
        <div className="payment-main-value">{getDisplayValue(payment)}</div>
        <div className="payment-secondary-info">{getSecondaryInfo(payment)}</div>
      </div>
      <div className="payment-card-actions">
        <NavLink to={`/payments/edit/${payment._id}`} className="btn btn-sm btn-outline">
          Edit
        </NavLink>
        <button className="btn btn-sm btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
