exports.getAllTournaments = async (req, res) => {
  res.send("Not yet implemented.");
};

exports.getTournamentById = async (req, res) => {
  let tournaments = {
    data: [
      {
        tournament_id: 1,
        name: "Test Tourney",
        game_id: 1,
        start_date: "2024-08-03",
        end_date: "2024-08-03",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        organization_id: 1,
        coach_id: 1,
      },
      {
        tournament_id: 2,
        name: "Other Tourney ",
        game_id: 2,
        start_date: "2024-08-04",
        end_date: "2024-08-05",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        organization_id: 2,
        coach_id: 1,
      },
    ],
  };

  let games = {
    data: [
      {
        game_id: 1,
        name: "Mario Kart 8 Deluxe",
        genre: "Racing",
        developer: "Nintendo",
      },
      {
        game_id: 2,
        name: "Street Fighter 6",
        genre: "Fighting",
        developer: "Capcom",
      },
    ],
  };

  let organizations = {
    data: [
      {
        organization_id: 1,
        name: "Sony Interactive Entertainment LLC",
        type: "Video Game",
        contact_email: "sony@gmail.com",
        website: "https://electronics.sony.com/",
      },
      {
        organization_id: 2,
        name: "Drexel Gaming Association",
        type: "School Club",
        contact_email: "drexelgaming77@gmail.com",
        website: "https://cms.cci.drexel.edu/dga/",
      },
    ],
  };
  //pool.query("SELECT * FROM Tournaments WHERE tournament_id")
  const id = parseInt(req.params.id);
  let tournament = tournaments.data[id - 1];
  let game_id = parseInt(tournament.game_id);
  let game = games.data[game_id - 1];
  let org_id = parseInt(tournament.organization_id);
  let org = organizations.data[org_id - 1];
  let start_date = new Date(tournament.start_date);
  let end_date = new Date(tournament.end_date);
  res.send(
    `<!DOCTYPE html>
         <html>
         	<head>
            	<title>${tournament.name}</title>
            </head>
            <body>
            	<h1>${tournament.name}</h1>
                <h3>Hosted by: ${org.name} - ${org.contact_email}</h3>
                <h3>${start_date.toDateString()} - ${end_date.toDateString()}</h3>
                <h3>Game: ${game.name}</h3>
                <div>
                	<h4>Description:</h4>
                	<p>${tournament.description}</p>
                </div>
                <a>Home page</a>
                <a>Registration</a>
                <a>Brackets</a>
            </body>
         </html>
    `,
  );
};

exports.createTournament = async (req, res) => {
  res.send("Not yet implemented.");
};

exports.updateTournament = async (req, res) => {
  res.send("Not yet implemented.");
};

exports.deleteTournament = async (req, res) => {
  res.send("Not yet implemented.");
};
