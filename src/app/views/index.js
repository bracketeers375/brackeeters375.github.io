import express from "express";
const viewRouter = express.Router();

const VIEW_PREFIX = "ejs";

viewRouter.get("/login", (req, res) => {
  res.render(`${VIEW_PREFIX}/login`, {
    title: "Login - Bracketeers",
  });
});

viewRouter.get("/registration", (req, res) => {
  res.render(`${VIEW_PREFIX}/registration`, {
    title: "Registration - Bracketeers",
  });
});

viewRouter.get("/search", (req, res) => {
  res.render(`${VIEW_PREFIX}/search`, {
    title: "Search - Bracketeers",
  });
});

viewRouter.get("/attendees", (req, res) => {
  res.render(`${VIEW_PREFIX}/attendees`, {
    title: "Attendees List - Bracketeers",
  });
});

export default viewRouter;
