import express from 'express';
import {
  createPayment,
  getPayments,
  updatePayment,
  deletePayment,
} from '../controllers/paymentController.js';
import { validatePayment, validatePaymentUpdate } from '../validators/paymentValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', validatePayment, createPayment);
router.get('/', getPayments);
router.put('/:id', validatePaymentUpdate, updatePayment);
router.delete('/:id', deletePayment);

export default router;
