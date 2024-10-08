import mongoose from 'mongoose';

const { Schema } = mongoose; 

const ProductSchema = new Schema({
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    price: Number,
    location: String,
})


const Product = mongoose.model('Product', ProductSchema);

export default Product;