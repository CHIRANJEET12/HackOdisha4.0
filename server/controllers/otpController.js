import OTP from '../models/Otp.js';
import { generateOTP, sendOTP } from '../utils/otpUtils.js';

export const generateDeliveryOTP = async (req, res) => {
    try {
        const { buyerId, sellerId } = req.body;

        const otpBuyer = generateOTP();
        const otpSeller = generateOTP();

        const otpRecord = new OTP({
            buyer: buyerId,
            seller: sellerId,
            otpBuyer,
            otpSeller
        });

        await otpRecord.save();

        await sendOTP(buyerId, otpBuyer);  
        await sendOTP(sellerId, otpSeller);

        res.status(200).json({ message: 'OTPs sent to both buyer and seller' });
    } catch (error) {
        console.error('Error generating OTPs:', error);
        res.status(500).json({ message: 'Server error while generating OTPs' });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { buyerId, sellerId, otpBuyer, otpSeller } = req.body;

        const otpRecord = await OTP.findOne({ buyer: buyerId, seller: sellerId });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP request' });
        }

        const isBuyerOTPValid = otpRecord.otpBuyer === otpBuyer;
        const isSellerOTPValid = otpRecord.otpSeller === otpSeller;

        if (isBuyerOTPValid && isSellerOTPValid) {
            return res.status(200).json({ message: 'OTP verified successfully' });
        }

        res.status(400).json({ message: 'Invalid OTPs' });
    } catch (error) {
        console.error('Error verifying OTPs:', error);
        res.status(500).json({ message: 'Server error while verifying OTPs' });
    }
};
