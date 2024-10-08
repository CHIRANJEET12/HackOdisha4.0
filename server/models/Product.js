import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    price: Number,
    location: String,
})


module.exports = mongoose.model('Product', ProductSchema);