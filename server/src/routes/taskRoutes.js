import express from "express";
import { uploadCSV, getTasksByAgent } from "../controllers/taskController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, adminOnly, uploadCSV);
router.get("/agent/:id", protect, getTasksByAgent);

export default router;
