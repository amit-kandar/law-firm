import { Document, Schema, model, Model } from 'mongoose';

export interface UserDocument extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const UserSchema = new Schema<UserDocument, Model<UserDocument>>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

export const User = model<UserDocument>('User', UserSchema);