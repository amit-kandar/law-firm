import { Router } from "express";
import { service } from "../controllers/contact.controller";

const router = Router();

router.post('/', service);

export default router;