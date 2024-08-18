// Event listeners for the search functionality
let searchInput = document.getElementById("search-input");
let button = document.getElementById("search-button");

button.addEventListener("click", search);

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    search();
  }
});

function search() {
  let name = searchInput.value;
  fetch(`/api/search/getAll/${name}`)
    .then((response) => {
      if (response.status >= 400) {
        response.json().then((errorBody) => {
          let errorDiv = document.getElementById("search-results-body");
          errorDiv.textContent = errorBody.error || "Error getting results.";
        });
      } else {
        response.json().then((data) => {
          let searchResultsContainer =
            document.getElementById("search-results-body");
          searchResultsContainer.textContent = ""; // Clear previous results

          let tourneyData = getTableData(data.tourneys, "Tournaments");
          let gameData = getTableData(data.games, "Games");

          addTableRows(tourneyData, "Tournaments");
          addTableRows(gameData, "Games");
        });
      }
    })
    .catch((error) => {
      let errorDiv = document.getElementById("search-results-body");
      errorDiv.textContent = `Error getting results: ${error.message}`;
    });
}


// Helper function to process data
function getTableData(itemsArray, type) {
  let tableData = {};

  itemsArray.forEach((item) => {
    let id = type === "Tournaments" ? item.tournament_id : item.game_id;
    tableData[id] = {
      name: type === "Tournaments" ? item.tournament_name : item.game_name,
      details: item.description,
      genre: item.genre,
    };
  });

  return tableData;
}

// Function to add table rows
function addTableRows(tableData, displayType) {
  let searchResultsContainer = document.getElementById("search-results-body");
  console.log(searchResultsContainer);

  if (Object.keys(tableData).length === 0) {
    let emptyMessage = document.createElement("th");
    emptyMessage.textContent =
      displayType === "Tournaments"
        ? "No tournaments found."
        : "No games found.";
    searchResultsContainer.appendChild(emptyMessage);
  } else {
    for (const [key, value] of Object.entries(tableData)) {
      let bodyRow = document.createElement("tr");
      let name = value.name;
      let details = value.details;
      let genre = value.genre;

      let title = document.createElement("td");
      let detailsText = document.createElement("td");


      title.textContent = `${name}`;
      bodyRow.appendChild(title);
      detailsText.textContent =
        displayType === "Tournaments"
          ? `${details}`
          : `${genre}`;
      bodyRow.appendChild(detailsText);
      searchResultsContainer.appendChild(bodyRow);
    }
  }
}

