import express from 'express';
import User from '../models/User.js';
import Buyer from '../models/Buyer.js';
import Driver from '../models/Driver.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { encryptData } from '../utils/encryption.js'; 

dotenv.config();

const router = express.Router();

export const registerSeller =  async (req, res) => {
    const { name, email, address, adharNo, licenseNo, phone, bankDetails } = req.body;


    try {
        const seller = new User({
            name,
            email,
            address,
            adharNo,
            licenseNo,
            phone,
            bankDetails: {
                accountHolderName: bankDetails.accountHolderName,
                bankAccountNumber: encryptData(bankDetails.bankAccountNumber),
                ifscCode: encryptData(bankDetails.ifscCode),
                bankName: bankDetails.bankName,
                branchName: bankDetails.branchName,
                upiId: bankDetails.upiId ? encryptData(bankDetails.upiId) : undefined,
            },
        });

        await seller.save();
        res.status(201).json({ message: 'Seller registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register seller' });
    }
};

export const registerBuyer = async (req, res) => {
    const { name, email, password, adharNo, phone, shopnm, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const buyer = new Buyer({
            name,
            email,
            password: hashedPassword,
            adharNo,
            phone,
            shopnm,
            address
        });
        await buyer.save();
        res.status(201).json({ message: 'Buyer registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register buyer' });
    }
};


export const registerDriver = async (req, res) => {
    const {
        fullName,
        // dateOfBirth,
        contactNumber,
        emailAddress,
        password,
        aadharNumber,
        panCard,
        passportPhoto,
        // proofOfAddress,
        currentAddress,
        vehicleType,
        vehicleRegistrationNumber,
        drivingLicenseNumber,
        bankAccountNumber,
        ifscCode,
        bankName,
        branchName,
        policeClearanceCertificate,
        consentForBackgroundCheck,
        vehicleInsuranceDetails,
        permanentAddress,
        // emergencyContact,
        // other fields
    } = req.body;



    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving

        const driver = new Driver({
            fullName,
            // dateOfBirth,
            contactNumber,
            emailAddress,
            password: hashedPassword,
            panCard,
            passportPhoto,
            // proofOfAddress,
            currentAddress,
            vehicleType,
            vehicleRegistrationNumber,
            drivingLicenseNumber,
            bankAccountNumber,
            ifscCode,
            bankName,
            branchName,
            policeClearanceCertificate,
            consentForBackgroundCheck,
            vehicleInsuranceDetails,
            aadharNumber,
            permanentAddress,
            // emergencyContact,
            // Include other fields as necessary
        });

        await driver.save();
        res.status(201).json({ message: 'Driver registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register driver', details: error.message });
    }
};

// Universal login method for User, Buyer, and Driver
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Try finding user in each of the models
    let user = await User.findOne({ email });
    if (!user) {
        user = await Buyer.findOne({ email });
        if (!user) {
            user = await Driver.findOne({ email });
        }
    }

    // If no user is found, return error
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

