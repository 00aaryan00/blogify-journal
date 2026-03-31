const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      res.clearCookie(cookieName);
    }

    return next();
  };
}

function requireAuthentication(req, res, next) {
  if (!req.user) {
    return res.status(401).render("signin", {
      error: "Please sign in to continue.",
    });
  }

  return next();
}

module.exports = {
  checkForAuthenticationCookie,
  requireAuthentication,
};
