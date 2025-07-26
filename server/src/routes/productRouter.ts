import { Router } from "express";
import { jwtVender } from "../middlewares/jwtVender";
import {
  deleteProduct,
  getAllProducts,
  getProduct,
  insertProduct,
  updateProduct,
} from "../controllers/productController";
import { jwtAuth } from "../middlewares/jwtAuth";

const router = Router();

router.post("/", jwtVender, insertProduct);
router.get("/", jwtAuth, getAllProducts);
router.get("/:id", jwtAuth, getProduct);
router.put("/:id", jwtVender, updateProduct);
router.delete("/:id", jwtVender, deleteProduct);

export default router;
