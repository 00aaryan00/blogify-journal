require("dotenv").config();

const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const Blog = require("./models/blog");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { connectToMongo } = require("./services/mongodb");
// (vercel- serverless -> many instances connection ) cached mongo connection will be used across all requests, so we don't have to worry about multiple connections being created
const { asyncHandler } = require("./middlewares/asyncHandler");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/errorHandler");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.use(asyncHandler(async (req, res, next) => {
  await connectToMongo();
  next();
}));

app.get("/", asyncHandler(async (req, res) => {
  const allBlogs = await Blog.find({}).populate("createdBy").sort({
    createdAt: -1,
  });
  return res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
}));

app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.use(notFoundHandler);
app.use(errorHandler);

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Blogify running on port ${PORT}`));
}

module.exports = app;
