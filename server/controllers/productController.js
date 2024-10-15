import Product from '../models/Product.js';
import User from '../models/User.js';

export const postProduct = async (req, res) => {
    const { name,email, description, price, location, category, yearsUsed } = req.body; // Use 'name' here
    const sellerId = req.user.userId; 
    try {
        const product = new Product({
            seller: sellerId, 
            name,
            email, 
            description, 
            price, 
            location,
            category,
            yearsUsed
        });
        await product.save();
        const buyers = await User.find({ role: 'buyer' });
        buyers.forEach(buyer => {
            console.log(`Notifying buyer: ${buyer.email}`);
        });
        res.status(201).json({ message: 'Product posted and notifications sent' });
    } catch (error) {
        console.error('Error posting product:', error); // Log the error details
        res.status(500).json({ error: 'Failed to post product', details: error.message }); // Include error message in response
    }
};


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products); // Return the products as JSON
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
};