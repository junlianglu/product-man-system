import express from 'express';
import { 
    loginUserController, 
    signupUserController, 
    sendResetLinkController 
} from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUserController);
router.post('/signup', signupUserController);
router.post('/reset-password', sendResetLinkController);

export default router;