import { Router } from "express";
import { jwtVender } from "../middlewares/jwtVender";
import {
  deleteCategory,
  getAllCategories,
  getCategory,
  insertCategory,
  updateCategory,
} from "../controllers/categotyController";
import { jwtAuth } from "../middlewares/jwtAuth";

const router = Router();

router.post("/", jwtVender, insertCategory);
router.get("/", jwtAuth, getAllCategories);
router.get("/:id", jwtAuth, getCategory);
router.put("/:id", jwtVender, updateCategory);
router.delete("/:id", jwtVender, deleteCategory);

export default router;
