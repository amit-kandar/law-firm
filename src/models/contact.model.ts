import { Document, Schema, model, Model } from 'mongoose';

export interface ContactDocument extends Document {
    name: string;
    email: string;
    phone_number: string;
    subject: string;
    message: string;
}

const ContactSchema = new Schema<ContactDocument, Model<ContactDocument>>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true
    },
    phone_number: {
        type: String,
        required: true
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

export const Contact = model<ContactDocument>('Contact', ContactSchema);