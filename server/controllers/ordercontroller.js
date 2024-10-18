import Payment from "../models/order.js";


export const createPayment = async(req,res)=>{
    try{
        const { transactionId, amountPaid, paymentTime } = req.body;
        const newPayment = new Payment({
            transactionId,
            amountPaid,
            paymentTime,
          });
          await newPayment.save();
          res.status(201).json({ message: 'Payment recorded successfully' });
        } catch (error) {
          res.status(500).json({ error: 'Error processing payment' });
        }
}