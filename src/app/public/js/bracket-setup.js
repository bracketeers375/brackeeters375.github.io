let numPlayersInput = document.getElementById("numPlayers");
let formatInput = document.getElementById("format");
let saveInput = document.getElementById("saveButton");
let numPlayersVal;
let formatVal;

saveInput.addEventListener("click", genBracketPost);
console.log("test");

function genBracketPost() {
  console.log("button pressed");
  numPlayersVal = numPlayersInput.value;
  formatVal = formatInput.value;
  console.log("numPlayers: ", numPlayersVal);
  console.log("format: ", formatVal);

  document.getElementById("bracketsViewerExample").replaceChildren();

  fetch("/api/brackets/createTest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      numPlayers: Number(numPlayersVal),
      format: formatVal,
    }),
  })
    .then((response) => {
      console.log("Response received: ", response.status);
      console.log("responese: ", response);

      if (response.status == 200) {
        response.json().then((body) => {
          console.log("body: ", body);
          renderBracket(body.tournamentData);
        });
      }
    })
    .catch((error) => {
      console.log(error);
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

window.bracketsViewer.onMatchClicked = async (match) => {
  console.log("match: ", match);
  openModal(match);
};

function openModal(match) {
  let modal = document.getElementById("modal");
  const matchTitle = document.querySelector(
    `[data-match-id="${match.id}"] .opponents > span`,
  ).textContent;
  modal.querySelector("h3").innerText = matchTitle;
  modal.style.display = "block";
}

function closeModal() {
  let modal = document.getElementById("modal");
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
