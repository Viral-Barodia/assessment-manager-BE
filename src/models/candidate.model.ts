import mongoose from 'mongoose';
const { Schema } = mongoose;

const candidateSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'],
        index: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{10}$/, 'Please fill a valid phone number'],
    },
    is_deleted: {
        type: Boolean,
        default: false,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

candidateSchema.index({ name: 'text' });

export const Candidate = mongoose.model('Candidate', candidateSchema);
