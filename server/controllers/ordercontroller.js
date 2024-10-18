import Order from "../models/Order.js"; // Import Order schema
import Buyer from "../models/Buyer.js"; // Import Buyer schema
import Seller from "../models/User.js"; // Import Seller schema

// Controller for creating a new order with payment details
export const createOrder = async (req, res) => {
  const {
    productID,
    buyer,                // Assuming buyer is the ObjectId from the Buyer schema
    seller,               // Assuming seller is the ObjectId from the Seller schema
    pickupAddress,
    deliveryAddress,
    transactionId,
    amountPaid,
    paymentTime,         // Make sure paymentTime is in the correct format
  } = req.body; // Fetch from the request body

  try {
    // Validate input fields
    if (!productID || !buyer || !seller || !pickupAddress || !deliveryAddress || !transactionId || !amountPaid || !paymentTime) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the buyer exists
    const foundBuyer = await Buyer.findById(buyer);
    if (!foundBuyer) {
      return res.status(400).json({ message: 'Buyer not found.' });
    }

    // Check if the seller exists
    const foundSeller = await Seller.findById(seller);
    if (!foundSeller) {
      return res.status(400).json({ message: 'Seller not found.' });
    }

    // Create a new order
    const newOrder = new Order({
      productID,
      buyer,
      seller,
      pickupAddress,
      deliveryAddress,
      transactionId,
      amountPaid,
      paymentTime: new Date(paymentTime), // Convert to Date if necessary
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    return res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};
