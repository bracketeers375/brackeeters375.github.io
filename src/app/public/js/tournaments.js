let testCreateBtn = document.getElementById("testCreate");
testCreateBtn.addEventListener("click", getTest);

function createTest() {

    fetch("api/tournaments/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            t_name: "test tournament",
            g_id: 1,
            e_id: 1,
            }),
    })
    .then((response) => {
        console.log("response: ", response);

    })
    .catch((error) => {
        console.log(error);
    });
}

function getTest() {
    fetch(`api/tournaments/get/1`)
        .then((response) => {
            return response.json();
        })
        .then((body) => {
            console.log("body: ", body);
            renderBracket(body.tournament_json);
        });

}

function renderBracket(data) {
  console.log("data: ", data);
  document.getElementById("bracketsViewerExample").innerHTML = "";

  window.bracketsViewer.render(
    {
      stages: data.stage,
      matches: data.match,
      matchGames: data.match_game,
      participants: data.participant,
    },
    {
      selector: "#" + "bracketsViewerExample",
      participantOriginPlacement: "before",
      separatedChildCountLabel: true,
      showSlotsOrigin: true,
      showLowerBracketSlotsOrigin: true,
      highlightParticipantOnHover: true,
    },
  );
}