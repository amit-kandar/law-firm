// config/nodemailer.ts

import nodemailer, { Transporter } from 'nodemailer';

interface MailConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
    debug: boolean;
    logger: boolean;
}

// Function to configure and create transporter
const createTransporter = (): Transporter => {
    const mailConfig: MailConfig = {
        host: process.env.MAIL_HOST || '',
        port: Number(process.env.MAIL_PORT) || 0, // Ensure it's a number
        secure: true, // Or use a condition based on your environment
        auth: {
            user: process.env.MAIL_USER || '',
            pass: process.env.MAIL_PASSWORD || '',
        },
        debug: true,
        logger: true,
    };

    return nodemailer.createTransport(mailConfig);
};

export { createTransporter };
