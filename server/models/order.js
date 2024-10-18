import mongoose from "mongoose";

// Define the Payment schema
const paymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  paymentTime: {
    type: String, // Storing time as a string (e.g., "14:30")
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Export the schema as a model
const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;