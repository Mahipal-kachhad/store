import { Router } from "express";
import { jwtVendor } from "../middlewares/jwtVendor";
import {
  deleteCategory,
  getAllCategories,
  getCategory,
  insertCategory,
  updateCategory,
} from "../controllers/categotyController";
import { jwtAuth } from "../middlewares/jwtAuth";

const router = Router();

router.post("/", jwtVendor, insertCategory);
router.get("/", jwtAuth, getAllCategories);
router.get("/:id", jwtAuth, getCategory);
router.put("/:id", jwtVendor, updateCategory);
router.delete("/:id", jwtVendor, deleteCategory);

export default router;
