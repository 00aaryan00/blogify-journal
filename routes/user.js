const { Router } = require("express");
const User = require("../models/user");
const { asyncHandler } = require("../middlewares/asyncHandler");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin", {
    user: req.user,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup", {
    user: req.user,
  });
});

router.post("/signin", asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
      })
      .redirect("/");
  } catch (error) {
    return res.render("signin", {
      user: null,
      error: "Incorrect Email or Password",
    });
  }
}));

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.post("/signup", asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).render("signup", {
      user: null,
      error: "All fields are required.",
    });
  }

  await User.create({
    fullName,
    email,
    password,
  });

  return res.redirect("/user/signin");
}));

module.exports = router;
