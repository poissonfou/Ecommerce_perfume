const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/pages/index.html");
});

app.get("/pages/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/pages/shop.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "shop.html"));
});

app.get("/pages/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "login.html"));
});

app.listen(3000, () => console.log("server running"));
