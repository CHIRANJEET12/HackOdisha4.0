import mongoose from 'mongoose';

const { Schema } = mongoose;

const DriverSchema = new Schema({
    // Personal Information
    fullName: { type: String, required: true },
    // dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true },
    contactNumber: { 
        type: String, 
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v); // Validates a 10-digit phone number
            },
            message: props => `${props.value} is not a valid mobile number!`
        },
        required: true
    },
    emailAddress: { type: String, unique: true, },

    aadharNumber: { type: String, },
    panCard: { type: String, },
    passportPhoto: { type: String, }, // Path or URL to the photo file

    permanentAddress: { type: String, },
    currentAddress: { type: String }, // Optional if same as permanent
    // proofOfAddress: { type: String, }, // Path or URL to the document

    vehicleType: { type: String, }, 
    vehicleRegistrationNumber: { type: String, },
    drivingLicenseNumber: { type: String, },
    vehicleInsuranceDetails: { type: String, }, // Could be document or policy details

    // Bank Details
    bankAccountNumber: { type: String,  },
    ifscCode: { type: String,  },
    bankName: { type: String,  },
    branchName: { type: String,},

    // Emergency Contact
    // emergencyContact: {
    //     name: { type: String, },
    //     contactNumber: { 
    //         type: String, 
    //         validate: {
    //             validator: function(v) {
    //                 return /^[0-9]{10}$/.test(v); // Validates a 10-digit phone number
    //             },
    //             message: props => `${props.value} is not a valid mobile number!`
    //         },
    //         required: true
    //     }
    // },
    

    // Background Verification
    policeClearanceCertificate: { type: String,  }, // Path or URL to the certificate
    consentForBackgroundCheck: { type: Boolean, default: false },

}, { timestamps: true });

const Driver = mongoose.model('Driver', DriverSchema);

export default Driver;
