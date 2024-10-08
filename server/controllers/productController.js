import Product from '../models/Product.js';
import User from '../models/User.js';

export const postProduct = async (req, res) => {
    const { name, description, price, location } = req.body;
    const sellerId = req.user.userId;

    try {
        const product = new Product({
            seller: sellerId, name, description, price, location
        });
        await product.save();

        const buyers = await User.find({ role: 'buyer' });
        buyers.forEach(buyer => {
            console.log(`Notifying buyer: ${buyer.email}`);
        });

        res.status(201).json({ message: 'Product posted and notification sent' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to post product' });
    }
};