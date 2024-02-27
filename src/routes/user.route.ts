import { Router } from "express";
import { contactUs } from "../controllers/contact.controller";

const router = Router();

router.post('/contact-us', contactUs);

export default router;