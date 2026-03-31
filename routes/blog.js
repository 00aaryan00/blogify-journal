const { Router } = require("express");
const multer = require("multer");

const Blog = require("../models/blog");
const Comment = require("../models/comment");
const { requireAuthentication } = require("../middlewares/authentication");
const {
  getMissingImageKitVars,
  uploadBlogCover,
} = require("../services/imagekit");

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed."));
    }

    return cb(null, true);
  },
});

router.get("/compose", requireAuthentication, (req, res) => {
  const missingImageKitVars = getMissingImageKitVars();

  return res.render("addBlog", {
    user: req.user,
    imageKitReady: missingImageKitVars.length === 0,
    imageKitMessage: missingImageKitVars.length
      ? `Add these ImageKit env vars before publishing: ${missingImageKitVars.join(
          ", "
        )}`
      : null,
  });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );

  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

router.post("/comment/:blogId", requireAuthentication, async (req, res) => {
  if (!req.body.content?.trim()) {
    return res.redirect(`/blog/${req.params.blogId}`);
  }

  await Comment.create({
    content: req.body.content.trim(),
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post(
  "/",
  requireAuthentication,
  upload.single("coverImage"),
  async (req, res) => {
  const { title, body } = req.body;
  if (!title?.trim() || !body?.trim() || !req.file) {
    return res.status(400).render("addBlog", {
      user: req.user,
      error: "Title, story and cover image are required.",
      imageKitReady: getMissingImageKitVars().length === 0,
      imageKitMessage: null,
    });
  }

  let coverImageURL;

  try {
    coverImageURL = await uploadBlogCover(req.file);
  } catch (error) {
    return res.status(500).render("addBlog", {
      user: req.user,
      error:
        error.message ||
        "Cover image upload failed. Please check ImageKit settings.",
      imageKitReady: false,
      imageKitMessage: "ImageKit upload is currently unavailable.",
    });
  }

  const blog = await Blog.create({
    body: body.trim(),
    title: title.trim(),
    createdBy: req.user._id,
    coverImageURL,
  });
  return res.redirect(`/blog/${blog._id}`);
  }
);

module.exports = router;
