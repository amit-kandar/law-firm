import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from "../utils/asyncHandler";
import { Contact } from '../models/contact.model';
import { APIError } from '../utils/APIError';
import { APIResponse } from '../utils/APIResponse';
import validator from 'validator';

export const contactUs = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, subject, message } = req.body;

        if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(subject) || validator.isEmpty(message)) {
            throw new APIError(400, "All Fields Are Required");
        }

        if (!validator.isEmail(email)) {
            throw new APIError(400, "Invalid Email");
        }

        const data = await Contact.create({
            name,
            email,
            subject,
            message
        })

        if (!data) {
            throw new APIError(400, "Failed To Store Data");
        }
        res.status(201).json(new APIResponse(201, { data }, "Successfully Created Data"));
    } catch (error) {
        next(error);
    }
})