// Selecting the input and button elements
let searchInput = document.getElementById("search-input");
let button = document.getElementById("search-button");

// Adding event listener to the button
button.addEventListener("click", getPartByName);

function getPartByName() {
    let name = searchInput.value;
    fetch(`/api/tournaments/getAll/${encodeURIComponent(name)}`)
        .then((response) => {
            if (response.status >= 400) {
                response.json().then(errorBody => {
                    let errorDiv = document.getElementById("search-results");
                    errorDiv.textContent = errorBody.error || "Error getting results.";
                });
            } else {
                response.json().then(data => {
                    console.log("DATA!!!", data);
                    let tableData = getTableData(data); // Assuming `data` is in the correct format
                    addTableRows(tableData);
                });
            }
            console.log("response: ", response);
        })
        .catch((error) => {
            let errorDiv = document.getElementById("search-results");
            errorDiv.textContent = `Error getting results: ${error.message}`;
        });
}

// Helper function to process data (modify if needed based on actual data structure)
function getTableData(data) {
    let tableData = {};

    data.forEach(item => {
        let id = item.id; // Adjust based on actual data structure
        tableData[id] = {
            name: item.name,
            details: item.details
        };
    });

    return tableData;
}

function addTableRows(tableData) {
    let searchResultsContainer = document.getElementById("search-results");
    searchResultsContainer.innerHTML = ""; // Clear previous results

    for (const [key, value] of Object.entries(tableData)) {
        let name = value.name;
        let details = value.details;

        let newDiv = document.createElement("div");
        newDiv.textContent = `Name: ${name}, Details: ${details}`;
        searchResultsContainer.append(newDiv);
    }
}
