import twilio from 'twilio';  // Example if you are using Twilio for SMS

// Example configuration for Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Add this to your .env file
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Add this to your .env file
const client = twilio(accountSid, authToken);

// Function to generate a random OTP
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

// Function to send OTP via SMS
export const sendOTP = async (phoneNumber, otp) => {
    try {
        await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
            to: phoneNumber
        });
        console.log(`OTP sent to ${phoneNumber}`);
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};
