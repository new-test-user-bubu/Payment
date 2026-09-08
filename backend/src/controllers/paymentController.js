import PaymentMethod from '../models/PaymentMethod.js';

export const createPayment = async (req, res) => {
  try {
    const paymentData = {
      ...req.body,
      user: req.user.id,
    };

    const payment = await PaymentMethod.create(paymentData);

    res.status(201).json({
      success: true,
      message: 'Payment method added successfully',
      data: { payment: payment.getMaskedData() },
    });
  } catch (error) {
    throw error;
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await PaymentMethod.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    const maskedPayments = payments.map(p => p.getMaskedData());

    res.json({
      success: true,
      data: { payments: maskedPayments },
    });
  } catch (error) {
    throw error;
  }
};

export const updatePayment = async (req, res) => {
  try {
    const payment = await PaymentMethod.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found',
      });
    }

    // Check ownership
    if (payment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this payment method',
      });
    }

    // Whitelist of allowed fields for update
    const allowedFields = [
      'paymentType',
      'ifscCode',
      'branchName',
      'bankName',
      'accountNumber',
      'accountHolderName',
      'paytmNumber',
      'upiId',
      'paypalEmail',
      'usdtAddress',
    ];

    // Update only allowed fields
    allowedFields.forEach(key => {
      if (req.body[key] !== undefined) {
        payment[key] = req.body[key];
      }
    });

    await payment.save();

    res.json({
      success: true,
      message: 'Payment method updated successfully',
      data: { payment: payment.getMaskedData() },
    });
  } catch (error) {
    throw error;
  }
};

export const deletePayment = async (req, res) => {
  try {
    const payment = await PaymentMethod.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found',
      });
    }

    // Check ownership
    if (payment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this payment method',
      });
    }

    await payment.deleteOne();

    res.json({
      success: true,
      message: 'Payment method deleted successfully',
    });
  } catch (error) {
    throw error;
  }
};
