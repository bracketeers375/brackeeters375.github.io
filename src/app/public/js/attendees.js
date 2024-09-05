document.addEventListener("DOMContentLoaded", () => {
  const tourIdInput = document.getElementById("toursInEvent");
  tourIdInput.addEventListener("change", handleTourChange);
});

async function handleTourChange(event) {
  const tourId = event.target.value;
  try {
    const response = await fetch(`/tournaments/${tourId}/participants`);
    if (!response.ok) {
      const errorBody = await response.json();
      displayError(errorBody.error);
      return;
    }
    const participants = await response.json();
    const tableData = formatParticipants(participants);
    renderTableRows(tableData);
  } catch (error) {
    console.error("Error fetching participants:", error);
    displayError("Failed to fetch participants. Please try again.");
  }
}

function displayError(message) {
  const errorDiv = document.getElementById("errorContainer");
  errorDiv.textContent = message;
}

function formatParticipants(participantsArray) {
  const formattedParticipants = {};

  if (!participantsArray) return formattedParticipants;

  participantsArray.forEach(({ user_id, username, tournament_name }) => {
    if (!formattedParticipants[user_id]) {
      formattedParticipants[user_id] = {
        username,
        tournaments: [tournament_name],
      };
    } else {
      formattedParticipants[user_id].tournaments.push(tournament_name);
    }
  });

  return formattedParticipants;
}

function renderTableRows(tableData) {
  const attendeesTBody = document.getElementById("attendeesTBody");
  attendeesTBody.innerHTML = ''; // Clear previous rows

  Object.values(tableData).forEach(({ username, tournaments }) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${username}</td>
      <td>${tournaments.join(", ")}</td>
    `;
    attendeesTBody.appendChild(newRow);
  });
}