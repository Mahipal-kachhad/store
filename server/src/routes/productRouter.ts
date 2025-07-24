import { Router } from "express";
import { jwtVender } from "../middlewares/jwtVender";
import {
  deleteProduct,
  getAllProducts,
  getProduct,
  insertProduct,
  updateProduct,
} from "../controllers/productController";

const router = Router();

router.post("/", jwtVender, insertProduct);
router.get("/", jwtVender, getAllProducts);
router.get("/:id", jwtVender, getProduct);
router.put("/:id", jwtVender, updateProduct);
router.delete("/:id", jwtVender, deleteProduct);

export default router;
