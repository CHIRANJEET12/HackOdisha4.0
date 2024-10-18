import express from 'express';
import {createPayment} from '../controllers/ordercontroller.js';

    const router = express.Router();

    router.post('/confirmation-payment',createPayment);

    export default router;
