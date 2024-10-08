import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

exports.register = async(req,res)=>{
    const { name, email, password, role, adharNo, licenseNo } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const user = new User({
            name, email, password: hashedPassword, role, adharNo, licenseNo
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET , { expiresIn: '1h' });
    res.json({ token });
};