exports.getHome = (req, res, next) => {
  res.render("pages/home", {
    isLoggedIn: req.session.isLoggedIn,
    route: "pages/home",
  });
};

exports.getLogin = (req, res, next) => {
  res.render("pages/login", {
    error: {
      message: null,
      type: null,
    },
    route: "pages/login",
    isLoggedIn: req.session.isLoggedIn,
  });
};
