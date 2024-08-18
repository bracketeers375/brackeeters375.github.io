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

viewRouter.get("/tournaments/get/:id", (req, res) => {
  let id = req.params.id;
  let apiPrefix = `${req.protocol}://${req.get('host')}`;
  fetch(`${apiPrefix}/api/tournaments/get/${id}`)
  .then((response) => {
        //console.log(response.url);
        return response.json();
      })
      .then((tournament) => {
        res.render(`${VIEW_PREFIX}/tournaments`, {
          id: tournament.tournament_id,
          title: `Tournaments - ${tournament.tournament_name}`,
          name: tournament.tournament_name,
          start_date: new Date(tournament.start_date).toDateString(),
          end_date: new Date(tournament.end_date).toDateString(),
          desc: tournament.description
        });
        
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).send(error);
      });
    });


viewRouter.get("/tournaments/register/:id", (req, res) => {
  let id = req.params.id;
  let tournTitle;
  let apiPrefix = `${req.protocol}://${req.get('host')}`;
  fetch(`${apiPrefix}/api/tournaments/get/${id}`)
  .then((tournResponse) => {
    return tournResponse.json();
  })
  .then((tournament) => {
    tournTitle = tournament.tournament_name;
    fetch(`${apiPrefix}/api/events/getAll/${id}`)
    .then((eventsResponse) => {
      return eventsResponse.json();
    })
    .then((events) => {
      res.render(`${VIEW_PREFIX}/tournaments-register`, {
        title: `Register for Tournament - ${tournTitle}`,
        name: tournTitle,
        eventsData: events,
      });
    }).catch((error) => {
      return res.status(400).send(error);
    });
  })
  .catch((error) => {
		return res.status(400).send(error);
  });

  viewRouter.use((req, res) => {
    res.status(404).render('404', {
      title: '404 - Page Not Found'
    })
});

export default viewRouter;
