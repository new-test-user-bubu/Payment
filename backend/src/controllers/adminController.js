import PaymentMethod from '../models/PaymentMethod.js';
import User from '../models/User.js';

export const getAllPayments = async (req, res) => {
  try {
    const {
      username,
      paymentType,
      bankName,
      ifscCode,
      paytmNumber,
      upiId,
      paypalEmail,
      usdtAddress,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    // Build filter query
    if (username) {
      const users = await User.find({
        username: { $regex: username, $options: 'i' },
      }).select('_id');
      const userIds = users.map(u => u._id);
      query.user = { $in: userIds };
    }

    if (paymentType) {
      query.paymentType = paymentType;
    }

    if (bankName) {
      query.bankName = { $regex: bankName, $options: 'i' };
    }

    if (ifscCode) {
      query.ifscCode = { $regex: ifscCode, $options: 'i' };
    }

    if (paytmNumber) {
      query.paytmNumber = { $regex: paytmNumber, $options: 'i' };
    }

    if (upiId) {
      query.upiId = { $regex: upiId, $options: 'i' };
    }

    if (paypalEmail) {
      query.paypalEmail = { $regex: paypalEmail, $options: 'i' };
    }

    if (usdtAddress) {
      query.usdtAddress = { $regex: usdtAddress, $options: 'i' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    const [payments, total] = await Promise.all([
      PaymentMethod.find(query)
        .populate('user', 'username email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      PaymentMethod.countDocuments(query),
    ]);

    const maskedPayments = payments.map(p => ({
      ...p.getMaskedData(),
      user: p.user ? { username: p.user.username, email: p.user.email } : null,
    }));

    res.json({
      success: true,
      data: {
        payments: maskedPayments,
        pagination: {
          page: parseInt(page),
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getPaymentStats = async (req, res) => {
  try {
    const stats = await PaymentMethod.aggregate([
      {
        $group: {
          _id: '$paymentType',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalUsers = await User.countDocuments();
    const totalPayments = await PaymentMethod.countDocuments();

    res.json({
      success: true,
      data: {
        totalUsers,
        totalPayments,
        byType: stats,
      },
    });
  } catch (error) {
    throw error;
  }
};
