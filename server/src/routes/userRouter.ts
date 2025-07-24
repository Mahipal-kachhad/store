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

const router = Router();

router.post("/register", validateRegister(RegisterSchema), registerUser);
router.post("/login", validateLogin(LoginSchema), authenticateUser);
router.get("/me", jwtAuth, getMe);
router.post("/logout", logout);
router.post("/change-password", jwtAuth, changePassword);
router.post("forget-password", jwtAuth, forgetPassword);

export default router;
