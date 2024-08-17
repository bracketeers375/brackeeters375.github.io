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
function addTableRows(tableData, section, displayType) {
  let searchResultsContainer = document.getElementById("search-results");

  // Add section title
  let sectionTitle = document.createElement("h3");
  sectionTitle.textContent = section;
  searchResultsContainer.appendChild(sectionTitle);

  if (Object.keys(tableData).length === 0) {
    let emptyMessage = document.createElement("p");
    emptyMessage.textContent =
      displayType === "Tournaments"
        ? "No tournaments found."
        : "No games found.";
    searchResultsContainer.appendChild(emptyMessage);
  } else {
    for (const [key, value] of Object.entries(tableData)) {
      let name = value.name;
      let details = value.details;
      let genre = value.genre;

      let newDiv = document.createElement("div");
      newDiv.classList.add("result-box");
      let header = document.createElement("h4");
      let detailsText = document.createElement("p");

      header.textContent = `${name}`;
      detailsText.textContent =
        displayType === "Tournaments"
          ? `Description: ${details}`
          : `Genre: ${genre}`;

      newDiv.appendChild(header);
      newDiv.appendChild(detailsText);
      searchResultsContainer.appendChild(newDiv);
    }
  }
}

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
          let errorDiv = document.getElementById("search-results");
          errorDiv.textContent = errorBody.error || "Error getting results.";
        });
      } else {
        response.json().then((data) => {
          let searchResultsContainer =
            document.getElementById("search-results");
          searchResultsContainer.textContent = ""; // Clear previous results

          let tourneyData = getTableData(data.tourneys, "Tournaments");
          let gameData = getTableData(data.games, "Games");

          addTableRows(tourneyData, "Tournaments", "Tournaments");
          addTableRows(gameData, "Games", "Games");
        });
      }
    })
    .catch((error) => {
      let errorDiv = document.getElementById("search-results");
      errorDiv.textContent = `Error getting results: ${error.message}`;
    });
}
