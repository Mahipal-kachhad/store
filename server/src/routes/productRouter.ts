import { Router } from "express";
import { jwtVendor } from "../middlewares/jwtVendor";
import {
  deleteProduct,
  getAllProducts,
  getProduct,
  insertProduct,
  updateProduct,
} from "../controllers/productController";
import { jwtAuth } from "../middlewares/jwtAuth";

const router = Router();

router.post("/", jwtVendor, insertProduct);
router.get("/", jwtAuth, getAllProducts);
router.get("/:id", jwtAuth, getProduct);
router.put("/:id", jwtVendor, updateProduct);
router.delete("/:id", jwtVendor, deleteProduct);

export default router;
