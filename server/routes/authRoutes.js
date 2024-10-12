import express from "express";
import { registerSeller, registerBuyer, registerDriver, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register/seller', registerSeller);
router.post('/register/buyer', registerBuyer);
router.post('/register/driver', registerDriver);
router.post('/login', login);

export default router;
