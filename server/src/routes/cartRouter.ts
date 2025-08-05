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
router.post("/", jwtAuth, insertCartItem);
router.put("/:id", jwtAuth, updateCart);
router.delete("/:id", jwtAuth, removeCartItem);
router.delete("/clear", jwtAuth, clearCart);

export default router;
