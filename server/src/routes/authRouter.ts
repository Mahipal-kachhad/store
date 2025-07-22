import { Router } from "express";
import {
  authenticateUser,
  getMe,
  logout,
  registerUser,
} from "../controllers/userController";
import { userAuth } from "../middlewares/jwtAuth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", authenticateUser);
router.get("/me", userAuth, getMe);
router.post("/logout", logout);

export default router;
