import { Router } from "express";
import { service } from "../controllers/service.controller";

const router = Router();

router.post('/', service);

export default router;