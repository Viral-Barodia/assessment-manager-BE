import mongoose from 'mongoose';

export async function connectToMongoDB(url: string) {
    return mongoose.connect(url);
}