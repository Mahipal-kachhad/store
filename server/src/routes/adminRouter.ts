import { Router } from "express";
import { jwtAdmin } from "../middlewares/jwtAdmin";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/adminController";

const router = Router();

router.get("/", jwtAdmin, getAllUser);
router.get("/:id", jwtAdmin, getUser)
router.put("/:id", jwtAdmin, updateUser)
router.delete("/:id", jwtAdmin, deleteUser)

export default router;
