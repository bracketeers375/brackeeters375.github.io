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