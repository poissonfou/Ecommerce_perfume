exports.getHome = (req, res, next) => {
  res.render("pages/home");
};

exports.getShop = (req, res, next) => {
  res.render("pages/shop");
};

exports.getLogin = (req, res, next) => {
  console.log(req.channel);
  res.render("pages/login", {
    error: {
      message: null,
      type: null,
    },
  });
};
