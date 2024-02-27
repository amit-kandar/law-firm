import { Request, Response, NextFunction } from "express";
import validator from "validator";
import { Service } from "../models/service.model";
import { APIError } from "../utils/APIError";
import { APIResponse } from "../utils/APIResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const service = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { first_name, last_name, email, service, subject, message } = req.body;

        if (validator.isEmpty(first_name) || validator.isEmpty(last_name) || validator.isEmpty(email) || validator.isEmpty(service) || validator.isEmpty(subject) || validator.isEmpty(message)) {
            throw new APIError(400, "All Fields Are Required");
        }

        if (!validator.isEmail(email)) {
            throw new APIError(400, "Invalid Email");
        }

        const data = await Service.create({
            first_name, last_name, email, service, subject, message
        })

        if (!data) {
            throw new APIError(400, "Failed To Store Service Data");
        }

        res.status(201).json(new APIResponse(201, { data }, "Successfully Submitted Service Data"));
    } catch (error) {
        next(error);
    }
})