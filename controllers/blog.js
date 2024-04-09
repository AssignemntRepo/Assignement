import ErrorHandler from "../middlewares/error.js";
import { Blog } from "../models/blog.js";

export const newBlog = async (req, res, next) => {
  try {
    const { title, author, content } = req.body;

    await Blog.create({
      title,
      author,
      content,
    });

    res.status(201).json({
      success: true,
      message: "Blog added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ _id: -1 });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const { title, author, content } = req.body;

    if (!blog) return next(new ErrorHandler("Blog not found", 404));

    blog.title = title;
    blog.author = author;
    blog.content = content;

    // Save the updated blog
    await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog Updated!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return next(new ErrorHandler("Blog not found", 404));
    await blog.deleteOne();

    res.status(200).json({
      message: "Blog Deleted!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
