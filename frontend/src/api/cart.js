import { apiRequest } from "./base";

export const getCartWithSummary = async ({ }) => {

}

router.get('/', authMiddleware, getCartWithSummaryController);
router.post('/add', authMiddleware, addToCartController)
router.put('/update', authMiddleware, updateItemQuantityController);
router.post('/discount', authMiddleware, applyDiscountCodeController);