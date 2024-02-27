import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from "../utils/asyncHandler";
import { User } from '../models/user.model';
import { APIError } from '../utils/APIError';
import { APIResponse } from '../utils/APIResponse';

export const contactUs = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, subject, message } = req.body;
        const data = await User.create({
            name, email, subject, message
        })
        if (!data) {
            throw new APIError(400, "Failed To Store Data");
        }
        res.status(201).json(new APIResponse(201, { data }, "Successfully Created Data"));
    } catch (error) {
        next(error);
    }
})