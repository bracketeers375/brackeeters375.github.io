document.getElementById("search-button").addEventListener("click", function () {
  const name = document.getElementById("search-input").value;

  fetch(`/search?name=${name}`)
    .then((response) => {
      if (response.headers.get("content-type").includes("application/json")) {
        return response.json();
      } else {
        return response.text(); // Or throw an error
      }
    })
    .then((data) => {
      const searchResultsContainer = document.getElementById("search-results");
      console.log(data);
      data.forEach((tournament) => {
        const tournamentElement = document.createElement("div");
        tournamentElement.textContent = `Tournament: ${tournament.name}`;
        searchResultsContainer.appendChild(tournamentElement);
      });
    })
    .catch((error) => {
      const searchResultsContainer = document.getElementById("search-results");
      const errorMessageElement = document.createElement("div");
      errorMessageElement.textContent = `Error getting results.`;
      searchResultsContainer.appendChild(errorMessageElement);
    });
});
