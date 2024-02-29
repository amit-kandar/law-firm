import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from "../utils/asyncHandler";
import { Contact } from '../models/contact.model';
import { APIError } from '../utils/APIError';
import { APIResponse } from '../utils/APIResponse';
import validator from 'validator';
import nodemailer from 'nodemailer';
import { createTransporter } from '../config/nodemailer';

export const contactUs = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, phone_number, subject, message } = req.body;

        if (!name || !phone_number || !subject || !message) {
            throw new APIError(400, "All Fields Are Required");
        }

        if (email && !validator.isEmail(email)) {
            throw new APIError(400, "Invalid Email");
        }

        const data = await Contact.create({
            name,
            email,
            phone_number,
            subject,
            message
        });

        if (!data) {
            throw new APIError(400, "Failed To Store Data");
        }

        const emailOptions: nodemailer.SendMailOptions = {
            from: `${process.env.MAIL_USER}`,
            to: `${email}`,
            subject: 'Thank You for Contacting Us',
            html: `
                <p>Dear ${name},</p>
                <p>Thank you for reaching out to us. We appreciate your interest and will get back to you as soon as possible.</p>
                <p>Best regards,<br>Kyrie Petrakis</p>
            `,
        };

        const transporter = createTransporter();
        transporter.sendMail(emailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error.message);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json(new APIResponse(201, { data }, "Successfully Created Data"));
    } catch (error) {
        next(error);
    }
});
