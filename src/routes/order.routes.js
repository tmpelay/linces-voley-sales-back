import { Router } from "express";
import {
  createOrder,
  getOrder,
  getOrders,
} from "../controllers/order.controllers.js";
import { authRequired } from "../middlewares/authRequired.js";

const router = Router();

router.get("/orders", authRequired, getOrders);
router.get("/orders/:orderId", authRequired, getOrder);
router.post("/orders", authRequired, createOrder);

export default router;
