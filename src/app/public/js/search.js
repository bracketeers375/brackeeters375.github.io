document.addEventListener("DOMContentLoaded", function () {
  fetch('/api/search/all')
    .then(response => response.json())
    .then(data => {
      let searchResultsContainer = document.getElementById("search-results-body");
      searchResultsContainer.textContent = ""; 

      let tourneyData = getTableData(data.tourneys, "Tournaments");

      addTableRows(tourneyData);
    })
    .catch(error => {
      let errorDiv = document.getElementById("search-results-body");
      errorDiv.textContent = `Error getting results: ${error.message}`;
    });
});

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
          let searchResultsContainer = document.getElementById(
            "search-results-body",
          );
          searchResultsContainer.textContent = ""; // Clear previous results

          let tourneyData = getTableData(data.tourneys, "Tournament");

          addTableRows(tourneyData);
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
    let id = item.tournament_id;
    tableData[id] = {
      type: type, // This will be "Tournaments"
      name: item.tournament_name,
    };
  });

  return tableData;
}

// Function to add table rows
function addTableRows(tableData) {
  let searchResultsContainer = document.getElementById("search-results-body");

  if (Object.keys(tableData).length === 0) {
    let emptyMessageRow = document.createElement("tr");
    let emptyMessage = document.createElement("td");
    emptyMessage.colSpan = 2;
    emptyMessage.textContent = "No tournaments found.";
    emptyMessageRow.appendChild(emptyMessage);
    searchResultsContainer.appendChild(emptyMessageRow);
  } else {
    for (const [key, value] of Object.entries(tableData)) {
      let bodyRow = document.createElement("tr");
      let typeCell = document.createElement("td");
      let titleCell = document.createElement("td");

      // Set the type (e.g., "Tournament") in the first cell
      typeCell.textContent = value.type;

      // Wrap the title in an anchor tag
      let anchor = document.createElement("a");
      anchor.href = `/tournament/${key}`;
      anchor.style.textDecoration = "none";
      anchor.textContent = value.name;

      // Append the anchor to the title cell
      titleCell.appendChild(anchor);

      // Append cells to the row
      bodyRow.appendChild(typeCell);
      bodyRow.appendChild(titleCell);

      // Append the row to the table body
      searchResultsContainer.appendChild(bodyRow);
    }
  }
}
