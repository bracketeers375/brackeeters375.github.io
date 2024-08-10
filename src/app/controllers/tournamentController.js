const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.APP_CONNECTION_STRING,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

exports.getAllTournaments = async (req, res) => {
  res.send("Not yet implemented.");
};

exports.getTournamentById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool
      .query(
        `SELECT 
      Tournaments.name,
      Games.name AS game_name,
      Tournaments.start_date,
      Tournaments.end_date,
      Tournaments.description,
      Organizations.name AS org_name,
      Organizations.contact_email AS org_email
      FROM Tournaments 
      JOIN Games on Tournaments.game_id = Games.game_id
      JOIN Organizations on Tournaments.organization_id = Organizations.organization_id
      WHERE tournament_id=$1`,
        [id],
      )
      .then((result) => {
        let tournament = result.rows[0];
        let name = tournament.name;
        let game_name = tournament.game_name;
        let org_name = tournament.org_name;
        let org_email = tournament.org_email;
        let start_date = new Date(tournament.start_date);
        let end_date = new Date(tournament.end_date);
        let desc = tournament.description;
        return res.send(
          `<!DOCTYPE html>
           	<html>
             	<head>
                <title>${name}</title>
              </head>
              <body>
                <h1>${name}</h1>
                  <h3>Hosted by: ${org_name} - ${org_email}</h3>
                  <h3>${start_date.toDateString()} - ${end_date.toDateString()}</h3>
                  <h3>Game: ${game_name}</h3>
                  <div>
                    <h4>Description:</h4>
                    <p>${desc}</p>
                  </div>
                  <p><a href=\"../../\" id=\"test\">Home page</a></p>
                  <p><a>Registration</a></p>
                  <p><a>Brackets</a></p>
                  <script>
                  	let a = document.getElementById(\"test\");
                    a.href = a.href.replace(\"/api/\", \"\");
                  </script>
              </body>
           	</html>
      	`,
        );
      });
  } catch (error) {
    console.log(error);
  }
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
