import express from "express";
const viewRouter = express.Router();

viewRouter.get("/", (req, res) => {
  res.render(`index`, {
    title: 'finish.gg - Community through competition'
  });
});

viewRouter.get("/search", (req, res) => {
  res.render(`search`, {
    title: "Search - Bracketeers",
  });
});

viewRouter.get("/attendees", (req, res) => {
  res.render(`attendees`, {
    title: "Attendees List - Bracketeers",
  });
});

viewRouter.get("/bracket-setup", (req, res) => {
    res.render(`bracket-setup`, {
    title: "Bracket Setup - Bracketeers",
  });
});

viewRouter.get("/events", (req, res) => {
  res.render(`events`, {
  title: "Event Creation - Bracketeers",
});
});


viewRouter.use((req, res) => {
  res.status(404).render('404', {
    title: '404 - Page Not Found'
  });
});

export default viewRouter;
