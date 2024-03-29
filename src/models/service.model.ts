import { Document, Schema, model, Model } from 'mongoose';

export interface ServiceDocument extends Document {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    service: string;
    subject: string;
    message: string;
}

const ServiceSchema = new Schema<ServiceDocument, Model<ServiceDocument>>({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
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
    service: {
        type: String,
        required: true,
        trim: true
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

export const Service = model<ServiceDocument>('Service', ServiceSchema);