import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {type:String},
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['buyer', 'seller', 'employee'], required: true },
    adharNo: String,  
    licenseNo: String,
})

module.exports = mongoose.model('User', UserSchema);