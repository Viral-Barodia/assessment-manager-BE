import mongoose from 'mongoose';
const { Schema } = mongoose;

const roleSchema = new Schema({
    roleName: {
        type: String,
        enum: ['admin', 'delivery admin'],
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});

export const Role = mongoose.model('Role', roleSchema);
