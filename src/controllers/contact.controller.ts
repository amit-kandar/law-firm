import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from "../utils/asyncHandler";
import { Contact } from '../models/contact.model';
import { APIError } from '../utils/APIError';
import { APIResponse } from '../utils/APIResponse';
import validator from 'validator';

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

        res.status(201).json(new APIResponse(201, { data }, "Successfully Created Data"));
    } catch (error) {
        next(error);
    }
});
