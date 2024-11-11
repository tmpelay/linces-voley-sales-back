import { Router } from "express";
import {
  createSale,
  getSale,
  getSales,
} from "../controllers/sale.controllers.js";
import { authRequired } from "../middlewares/authRequired.js";

const router = Router();

router.get("/sales", authRequired, getSales);
router.get("/sales/:saleId", authRequired, getSale);
router.post("/sales", createSale);

export default router;
