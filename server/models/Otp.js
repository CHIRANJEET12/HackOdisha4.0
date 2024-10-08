import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema({
    buyer: { type: Schema.Types.ObjectId, ref: 'User' },
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
    otpBuyer: String,
    otpSeller: String,
    expiresAt: { type: Date, default: Date.now, expires: 300 }
})

module.exports = mongoose.model('OTP', OtpSchema);