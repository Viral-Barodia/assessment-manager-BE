import mongoose from 'mongoose';
const { Schema } = mongoose;

const questionSchema = new Schema({
    questionText: {
        type: String,
        required: true,
        trim: true,
    },
    options: {
        type: [
            {
                optionText: { type: String, required: true },
                isCorrect: { type: Boolean, required: true }
            }
        ],
        validate: {
            validator: function(options: any) {
                return options.length === 4;
            },
            message: 'A question must have exactly 4 options.'
        }
    },
    marks: {
        type: Number,
        required: true,
        min: 0
    },
    negativeMarks: {
        type: Number,
        default: 0,
        min: 0
    },
    tags: {
        type: [String],
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

export const Question = mongoose.model('Question', questionSchema);
