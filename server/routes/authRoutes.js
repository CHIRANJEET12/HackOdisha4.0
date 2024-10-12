import express from "express";
import { registerSeller, registerBuyer, registerDriver, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/regSeller', registerSeller);
router.post('/regBuyer', registerBuyer);
router.post('/regDel', registerDriver);
router.post('/login', login);

export default router;
