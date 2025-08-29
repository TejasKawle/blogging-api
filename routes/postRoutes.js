import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Protected routes (logged-in users)
router.post("/", protect, createPost);

// Update & delete: only author or admin
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
