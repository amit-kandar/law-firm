import { Router } from "express";
import { contactUs } from "../controllers/user.controller";

const router = Router();

router.post('/contact-us', contactUs);

export default router;