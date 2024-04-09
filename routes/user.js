import express from "express";
import { login, logout, register, getMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/infor", isAuthenticated, getMyProfile);

export default router;
