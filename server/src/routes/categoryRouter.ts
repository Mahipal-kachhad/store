import { Router } from "express";
import { jwtProduct } from "../middlewares/jwtVender";
import {
  deleteCategory,
  getAllCategories,
  getCategory,
  insertCategory,
  updateCategory,
} from "../controllers/categotyController";

const router = Router();

router.post("/", jwtProduct, insertCategory);
router.get("/", jwtProduct, getAllCategories);
router.get("/:id", jwtProduct, getCategory);
router.put("/:id", jwtProduct, updateCategory);
router.delete("/:id", jwtProduct, deleteCategory);

export default router;
