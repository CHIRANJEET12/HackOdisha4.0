import mongoose from 'mongoose';

const { Schema } = mongoose;

const DriverSchema = new Schema({
    // Personal Information
    fullName: { type: String },
    dateOfBirth: { type: Date },
    contactNumber: { 
        type: String, 
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v); // Validates a 10-digit phone number
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    emailAddress: { type: String, unique: true },

    aadharNumber: { type: String },
    panCard: { type: String },
    passportPhoto: { type: String }, // This can store the path or URL to the photo file

    permanentAddress: { type: String },
    currentAddress: { type: String }, // Optional if same as permanent
    proofOfAddress: { type: String }, // Path or URL to the document

    vehicleType: { type: String }, 
    vehicleRegistrationNumber: { type: String },
    drivingLicenseNumber: { type: String },
    vehicleInsuranceDetails: { type: String }, // Could be document or policy details

    // Bank Details
    bankAccountNumber: { type: String },
    ifscCode: { type: String },
    bankName: { type: String },
    branchName: { type: String },

    // Emergency Contact
    emergencyContact: {
        name: { type: String },
        relationship: { type: String },
        contactNumber: { type: String }
    },

    // Employment History (optional)
    employmentHistory: [{
        previousEmployer: { type: String },
        reference: { type: String }
    }],

    // Background Verification
    policeClearanceCertificate: { type: String }, // Path or URL to the certificate
    consentForBackgroundCheck: { type: Boolean, default: false },

    // Role for Authorization
    role: { type: String, enum: ['driver'], default: 'driver' }
}, { timestamps: true });

const Driver = mongoose.model('Driver', DriverSchema);

export default Driver;
