import { Router } from "express";
import {
  deleteCategory,
  getAllCategories,
  getCategory,
  insertCategory,
  updateCategory,
} from "../controllers/categotyController";
import { jwtAuth } from "../middlewares/jwtAuth";
import { jwtAdmin } from "../middlewares/jwtAdmin";

const router = Router();

router.post("/", jwtAdmin, insertCategory);
router.get("/", jwtAuth, getAllCategories);
router.get("/:id", jwtAuth, getCategory);
router.put("/:id", jwtAdmin, updateCategory);
router.delete("/:id", jwtAdmin, deleteCategory);

export default router;
