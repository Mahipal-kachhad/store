import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import {
  clearCart,
  getCart,
  insertCartItem,
  removeCartItem,
  updateCart,
} from "../controllers/cartController";

const router = Router();

router.get("/", jwtAuth, getCart);
router.post("/add", jwtAuth, insertCartItem);
router.put("/update/:id", jwtAuth, updateCart);
router.delete("/remove/:id", jwtAuth, removeCartItem);
router.delete("/clear", jwtAuth, clearCart);

export default router;
