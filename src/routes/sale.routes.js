import { Router } from "express";
import { getSale, getSales } from "../controllers/sale.controllers.js";
import { authRequired } from "../middlewares/authRequired.js";

const router = Router();

router.get("/sales", authRequired, getSales);
router.get("/sales/:saleId", authRequired, getSale);

export default router;
