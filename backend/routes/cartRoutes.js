import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
    getCartWithSummaryController,
    addToCartController,
    updateItemQuantityController,
    applyDiscountCodeController
} from '../controllers/cartController.js';

const router = express.Router();

router.get('/', authMiddleware, getCartWithSummaryController);
router.post('/add', authMiddleware, addToCartController)
router.put('/update', authMiddleware, updateItemQuantityController);
router.post('/discount', authMiddleware, applyDiscountCodeController);

export default router;