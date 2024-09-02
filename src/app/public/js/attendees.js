// let tourIdInput = document.getElementById("tourId");
// let tourIdVal = tourIdInput.value;
// let button = document.getElementById("search");
// button.addEventListener("click", getPartByTourId);

function getPartByTourId() {
  tourIdVal = tourIdInput.value;
  fetch(`/api/participants/getAll/${tourIdVal}`).then((response) => {
    if (response.status >= 400) {
      response.json().then((errorBody) => {
        let errorDiv = document.getElementById("errorContainer");
        errorDiv.textContent = errorBody.error;
      });
    } else {
      response.json().then((body) => {
        console.log("BODY!!!", body);
        let tableData = getTableData(body.attendees);
        addTableRows(tableData);
      });
    }
    console.log("response: ", response);
  });
}

function getTableData(attendeesArray) {
  let smallerList = {};
  // userId: {username: str, games: []}

  for (let i = 0; i < attendeesArray.length; i++) {
    let currAttendee = attendeesArray[i];
    let cUID = currAttendee.user_id;
    let cUN = currAttendee.username;
    let cGamename = currAttendee.game_name;
    if (!smallerList.hasOwnProperty(cUID)) {
      let newObj = {
        username: cUN,
        games: [cGamename],
      };
      smallerList[cUID] = newObj;
    } else {
      smallerList[cUID].games.push(cGamename);
    }
  }
  //console.log("smallerList: ", smallerList);
  return smallerList;
}

function addTableRows(tableData) {
  for (const [key, value] of Object.entries(tableData)) {
    let entrantName = value.username;
    let gamesArray = value.games;
    let gamesStr = gamesArray.join(", ");

    let attendeesTBody = document.getElementById("attendeesTBody");
    let newR = document.createElement("tr");
    let nameTd = document.createElement("td");
    let gamesTd = document.createElement("td");
    nameTd.textContent = entrantName;
    gamesTd.textContent = gamesStr;
    newR.append(nameTd);
    newR.append(gamesTd);
    attendeesTBody.append(newR);
  }
}
