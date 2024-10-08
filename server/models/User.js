import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, enum: ['buyer', 'seller', 'employee'], required: true },
    adharNo: { type: String },
    licenseNo: { type: String },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v); 
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    }
});

const User = mongoose.model('User', UserSchema);

export default User;
