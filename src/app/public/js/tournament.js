window.bracketsViewer.onMatchClicked = async (match) => {
    console.log("match: ", match);
    openModal(match);
};

function openModal(match) {
    let modal = document.getElementById("modalMatch");
    const matchTitle = document.querySelector(
        `[data-match-id="${match.id}"] .opponents > span`,
    ).textContent;
    modal.querySelector("h3").innerText = matchTitle;
    modal.style.display = "block";
}

function closeModal() {
    console.log("test close");
    let modal = document.getElementById("modalMatch");
    modal.style.display = "none";
}

window.onclick = (event) => {
    console.log("test window");
    console.log(event);
        if (event.target == modalMatch) {
            modal.style.display = "none";
        }
    };

let cancelBtn = document.getElementById("cancel-Btn");
cancelBtn.addEventListener("click", closeModal);
