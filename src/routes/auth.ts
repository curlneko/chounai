import { Router } from "express";
import * as auth from "../controllers/auth";

const router = Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.post("/signup", auth.signup);

export default router;
