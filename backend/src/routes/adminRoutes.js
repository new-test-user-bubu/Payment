import express from 'express';
import { getAllPayments, getPaymentStats } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(requireAdmin);

router.get('/payments', getAllPayments);
router.get('/stats', getPaymentStats);

export default router;
