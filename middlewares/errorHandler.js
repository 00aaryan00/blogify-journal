function notFoundHandler(req, res) {
  return res.status(404).render("home", {
    user: req.user,
    blogs: [],
    error: "Page not found.",
  });
}

function errorHandler(error, req, res, next) {
  console.error("[blogify] request failed", {
    method: req.method,
    path: req.originalUrl,
    message: error.message,
  });

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).render("home", {
    user: req.user,
    blogs: [],
    error: "Something went wrong. Please try again.",
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
