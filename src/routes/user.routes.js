import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:userId", getUser);
router.post("/users", createUser);
router.put("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);

export default router;
