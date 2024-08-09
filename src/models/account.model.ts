import mongoose from 'mongoose';
const { Schema } = mongoose;

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'],
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

export const Account = mongoose.model('Account', accountSchema);
