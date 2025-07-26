import { Router } from "express";
import {
  authenticateUser,
  changePassword,
  forgetPassword,
  getMe,
  logout,
  registerUser,
} from "../controllers/userController";
import { jwtAuth } from "../middlewares/jwtAuth";
import { validateLogin, validateRegister } from "../middlewares/zodValidation";
import { LoginSchema, RegisterSchema } from "../types/zodSchema";
import { sendOtp, verifyOtp } from "../controllers/otpController";

const router = Router();

router.post("/register", validateRegister(RegisterSchema), registerUser);
router.post("/login", validateLogin(LoginSchema), authenticateUser);
router.get("/me", jwtAuth, getMe);
router.post("/logout", logout);
router.post("/change-password", jwtAuth, changePassword);
router.post("/reset-password", forgetPassword);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
