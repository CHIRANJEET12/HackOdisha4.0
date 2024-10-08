import express from 'express';
import { postProduct } from '../controllers/productController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/post', authenticate, postProduct);

export default router;
