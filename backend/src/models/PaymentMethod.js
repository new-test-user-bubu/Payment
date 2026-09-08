import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      index: true,
    },
    paymentType: {
      type: String,
      enum: {
        values: ['Bank', 'Paytm', 'UPI', 'PayPal', 'USDT'],
        message: 'Invalid payment type',
      },
      required: [true, 'Payment type is required'],
    },
    // Bank fields
    ifscCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    branchName: {
      type: String,
      trim: true,
    },
    bankName: {
      type: String,
      trim: true,
    },
    accountNumber: {
      type: String,
      trim: true,
    },
    accountHolderName: {
      type: String,
      trim: true,
    },
    // Paytm field
    paytmNumber: {
      type: String,
      trim: true,
    },
    // UPI field
    upiId: {
      type: String,
      trim: true,
    },
    // PayPal field
    paypalEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    // USDT field
    usdtAddress: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for user payment queries
paymentMethodSchema.index({ user: 1, paymentType: 1 });

// Conditional validation based on paymentType
paymentMethodSchema.pre('validate', function (next) {
  const requiredFields = {
    Bank: ['ifscCode', 'branchName', 'bankName', 'accountNumber', 'accountHolderName'],
    Paytm: ['paytmNumber'],
    UPI: ['upiId'],
    PayPal: ['paypalEmail'],
    USDT: ['usdtAddress'],
  };

  const fields = requiredFields[this.paymentType] || [];
  
  for (const field of fields) {
    if (!this[field] || this[field].trim() === '') {
      this.invalidate(field, `${field} is required for ${this.paymentType} payment type`);
    }
  }

  // Additional format validations
  if (this.paymentType === 'PayPal' && this.paypalEmail) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(this.paypalEmail)) {
      this.invalidate('paypalEmail', 'Please provide a valid email address');
    }
  }

  if (this.paymentType === 'Bank' && this.ifscCode) {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscRegex.test(this.ifscCode)) {
      this.invalidate('ifscCode', 'Invalid IFSC code format');
    }
  }

  next();
});

// Method to get masked data for UI display
paymentMethodSchema.methods.getMaskedData = function () {
  const obj = this.toObject();
  
  switch (this.paymentType) {
    case 'Bank':
      if (obj.accountNumber) {
        const last4 = obj.accountNumber.slice(-4);
        obj.maskedAccountNumber = '•••• •••• ' + last4;
      }
      break;
    case 'Paytm':
      if (obj.paytmNumber) {
        const last4 = obj.paytmNumber.slice(-4);
        obj.maskedPaytmNumber = '********' + last4;
      }
      break;
    case 'USDT':
      if (obj.usdtAddress) {
        const prefix = obj.usdtAddress.slice(0, 4);
        const suffix = obj.usdtAddress.slice(-4);
        obj.maskedUsdtAddress = `${prefix}...${suffix}`;
      }
      break;
    case 'UPI':
      obj.maskedUpiId = obj.upiId;
      break;
    case 'PayPal':
      obj.maskedPaypalEmail = obj.paypalEmail;
      break;
  }
  
  return obj;
};

export default mongoose.model('PaymentMethod', paymentMethodSchema);
