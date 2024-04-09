import express from "express";
import {
  deleteBlog,
  getBlogs,
  newBlog,
  updateBlog,
} from "../controllers/blog.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/newblog", isAuthenticated, newBlog);

router.get("/blogs", getBlogs);

router
  .route("/:id")
  .put(isAuthenticated, updateBlog)
  .delete(isAuthenticated, deleteBlog);

export default router;
