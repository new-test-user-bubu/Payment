const requiredFields = {
  Bank: ['ifscCode', 'branchName', 'bankName', 'accountNumber', 'accountHolderName'],
  Paytm: ['paytmNumber'],
  UPI: ['upiId'],
  PayPal: ['paypalEmail'],
  USDT: ['usdtAddress'],
};

export const validatePayment = (req, res, next) => {
  const { paymentType } = req.body;
  const errors = [];

  if (!paymentType || !requiredFields[paymentType]) {
    return res.status(400).json({
      success: false,
      message: 'Invalid payment type. Must be one of: Bank, Paytm, UPI, PayPal, USDT',
    });
  }

  const fields = requiredFields[paymentType];
  
  for (const field of fields) {
    const value = req.body[field];
    if (!value || value.trim() === '') {
      errors.push(`${field} is required for ${paymentType} payment type`);
    }
  }

  // Format validations
  if (paymentType === 'PayPal' && req.body.paypalEmail) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(req.body.paypalEmail)) {
      errors.push('Please provide a valid PayPal email address');
    }
  }

  if (paymentType === 'Bank' && req.body.ifscCode) {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscRegex.test(req.body.ifscCode)) {
      errors.push('Invalid IFSC code format');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

export const validatePaymentUpdate = (req, res, next) => {
  // For updates, we only validate fields that are being updated
  const { paymentType } = req.body;
  
  // If paymentType is being changed, validate all required fields for new type
  if (paymentType && requiredFields[paymentType]) {
    const fields = requiredFields[paymentType];
    const errors = [];
    
    for (const field of fields) {
      const value = req.body[field];
      if (!value || value.trim() === '') {
        errors.push(`${field} is required for ${paymentType} payment type`);
      }
    }
    
    if (paymentType === 'PayPal' && req.body.paypalEmail) {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(req.body.paypalEmail)) {
        errors.push('Please provide a valid PayPal email address');
      }
    }
    
    if (paymentType === 'Bank' && req.body.ifscCode) {
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!ifscRegex.test(req.body.ifscCode)) {
        errors.push('Invalid IFSC code format');
      }
    }
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
  }
  
  // If paymentType not changed, only validate provided fields
  if (!paymentType) {
    const errors = [];
    
    if (req.body.paypalEmail !== undefined) {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(req.body.paypalEmail)) {
        errors.push('Please provide a valid PayPal email address');
      }
    }
    
    if (req.body.ifscCode !== undefined) {
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!ifscRegex.test(req.body.ifscCode)) {
        errors.push('Invalid IFSC code format');
      }
    }
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
  }

  next();
};
