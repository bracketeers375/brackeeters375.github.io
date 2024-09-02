import express from "express";
import eventsService from "../api/services/eventsService.js";
import tournamentService from "../api/services/tournamentService.js";
import userService from "../api/services/userService.js";
import participantsService from "../api/services/participantsService.js";
const viewRouter = express.Router();

viewRouter.use(async (req, res, next) => {
  const userCookie = req.cookies.user;

  if (userCookie && userCookie.token) {
    try {
      const user = await userService.getUserByToken(userCookie.token);
      if (user) {
        res.locals.userName = user.username;
        next();
      } else {
        res.locals.userName = null;
        res.clearCookie('user');
        res.status(401).redirect('/');
      }
    } catch (error) {
      console.error("Error validating token:", error);
      res.locals.userName = null;
      res.status(500).send("Error validating user token.");
    }
  } else {
    res.locals.userName = null;
    next();
  }
});

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
    res.render("components/events/eventList", { events: openEvents });
  } catch (error) {
    console.error("Error fetching open events:", error);
    res.status(500).send("Error retrieving open events.");
  }
});

viewRouter.get("/events/upcoming", async (req, res) => {
  try {
    const upcomingEvents = await eventsService.getAllUpcomingEvents();
    res.render("components/events/eventList", { events: upcomingEvents });
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    res.status(500).send("Error retrieving upcoming events.");
  }
});

viewRouter.get("/events/closed", async (req, res) => {
  try {
    const closedEvents = await eventsService.getAllClosedEvents();
    res.render("components/events/eventList", { events: closedEvents });
  } catch (error) {
    console.error("Error fetching closed events:", error);
    res.status(500).send("Error retrieving closed events.");
  }
});

viewRouter.get("/events/create", async (req, res) => {
  res.render("eventCreation", {
    title: "Event Creation - Bracketeers"
  });
});

viewRouter.post("/events/create", async (req, res) => {
  const token = req.cookies?.user?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send("User must be logged in to perform this action.");
  }

  const { eventName, startDate, endDate } = req.body;
  if (!eventName || !startDate) {
    return res.status(400).send("Missing one or more required fields.");
  }

  try {
    // Retrieve user ID from the token
    const { user_id: userId } = await userService.getUserByToken(token);

    // Create the new event
    const newEvent = await eventsService.createEvent(eventName, startDate, endDate, userId);

    // Redirect to the new event's detail page after creation
    res.redirect(`/events/${newEvent.event_id}`);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).send("An error occurred while creating the event.");
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

viewRouter.get("/events/:event_id/attendees", async (req, res) => {
  const eventId = parseInt(req.params.event_id);
  try {
    const event = await eventsService.getEventById(eventId);
      if (!event) {
      return res.status(404).render("404", {
        title: "404 - Event Attendees Not Found",
      });
    }

    const tournamentData = await tournamentService.getTournamentsByEventId(eventId);
    console.log("tournamentData" , tournamentData);

    res.render("attendees", {
      title: `Attendees List - ${eventId}`,
      tournamentData
    });

  } catch (error) {
    console.error("Error fetching attendees:", error);
    res.status(500).send("Error retrieving attendees.");
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

viewRouter.use((req, res) => {
  res.status(404).render("404", {
    title: "404 - Page Not Found",
  });
});

export default viewRouter;
