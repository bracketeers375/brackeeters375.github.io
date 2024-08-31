import express from "express";
import eventsService from "../api/services/eventsService.js";
import tournamentService from "../api/services/tournamentService.js";
const viewRouter = express.Router();

viewRouter.get("/", (req, res) => {
  res.render(`index`, {
    title: "finish.gg - Community through competition",
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

viewRouter.get("/events", async (req, res) => {
  try {
    const openEvents = await eventsService.getAllOpenEvents();
    res.render("events", {
      title: "Events - Bracketeers",
      openEvents,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Error retrieving events.");
  }
});

viewRouter.get("/events/open", async (req, res) => {
  try {
    const openEvents = await eventsService.getAllOpenEvents();
    res.render("partials/events/eventsList", { events: openEvents });
  } catch (error) {
    console.error("Error fetching open events:", error);
    res.status(500).send("Error retrieving open events.");
  }
});

viewRouter.get("/events/upcoming", async (req, res) => {
  try {
    const upcomingEvents = await eventsService.getAllUpcomingEvents();
    res.render("partials/events/eventsList", { events: upcomingEvents });
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    res.status(500).send("Error retrieving upcoming events.");
  }
});

viewRouter.get("/events/closed", async (req, res) => {
  try {
    const closedEvents = await eventsService.getAllClosedEvents();
    res.render("partials/events/eventsList", { events: closedEvents });
  } catch (error) {
    console.error("Error fetching closed events:", error);
    res.status(500).send("Error retrieving closed events.");
  }
});

viewRouter.get("/events/:event_id", async (req, res) => {
  const eventId = parseInt(req.params.event_id);

  try {
    const event = await eventsService.getEventById(eventId);
    const tournaments =
      await tournamentService.getTournamentsByEventId(eventId);

    if (!event) {
      return res.status(404).render("404", {
        title: "404 - Event Not Found",
      });
    }

    res.render("event", {
      title: `Event - ${event.event_name}`,
      event,
      tournaments,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).send("Error retrieving the event.");
  }
});

viewRouter.get("/tournament/:id", async (req, res) => {
  const tournamentId = parseInt(req.params.id);

  try {
    const event = await eventsService.getEventByTournamentId(tournamentId);
    const tournament = await tournamentService.getTournamentById(tournamentId);

    if (!event || !tournament) {
      return res.status(404).render("404", {
        title: "404 - Tournament Not Found",
      });
    }

    res.render("tournament", {
      title: `Tournament - ${tournament.tournament_name}`,
      tournament,
      event,
    });
  } catch (error) {
    console.error("Error fetching tournament:", error);
    res.status(500).send("Error retrieving the tournament.");
  }
});

viewRouter.get("/event/create", (req, res) => {
  res.render("event-create", {
  	title: "Event Creation - Bracketeers"
  });
});

viewRouter.use((req, res) => {
  res.status(404).render("404", {
    title: "404 - Page Not Found",
  });
});

export default viewRouter;
