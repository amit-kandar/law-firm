import { Request, Response, NextFunction } from "express";
import validator from "validator";
import { Service } from "../models/service.model";
import { APIError } from "../utils/APIError";
import { APIResponse } from "../utils/APIResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const service = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { first_name, last_name, email, service, subject, message, phone_number } = req.body;

        if (!first_name || !last_name || !service || !subject || !message || !phone_number) {
            throw new APIError(400, "All Fields Are Required");
        }

        if (email && !validator.isEmail(email)) {
            throw new APIError(400, "Invalid Email");
        }

        const data = await Service.create({
            first_name, last_name, email, service, subject, message, phone_number
        })

        if (!data) {
            throw new APIError(400, "Failed To Store Service Data");
        }

        res.status(201).json(new APIResponse(201, { data }, "Successfully Submitted Service Data"));
    } catch (error) {
        next(error);
    }
})