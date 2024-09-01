document.addEventListener("DOMContentLoaded", function () {
  fetch('/api/search/all')
    .then(response => response.json())
    .then(data => {
      let searchResultsContainer = document.getElementById("search-results-body");
      searchResultsContainer.textContent = ""; 

      if (data.tourneys) {
        let tourneyData = getTableData(data.tourneys, "Tournaments");
        addTableRows(tourneyData);
      } else {
        // If there are no tournaments, display the 'No tournaments found.' message
        addTableRows({});
      }
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

  if (!Array.isArray(itemsArray)) {
    itemsArray = [itemsArray];
  }

  itemsArray.forEach((item) => {
    let id = item.tournament_id;
    tableData[id] = {
      type: type,
      name: item.tournament_name,
    };
  });

  return tableData;
}

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

      typeCell.textContent = value.type;

      let anchor = document.createElement("a");
      anchor.href = `/tournament/${key}`;
      anchor.style.textDecoration = "none";
      anchor.textContent = value.name;

      titleCell.appendChild(anchor);

      bodyRow.appendChild(typeCell);
      bodyRow.appendChild(titleCell);

      searchResultsContainer.appendChild(bodyRow);
    }
  }
}