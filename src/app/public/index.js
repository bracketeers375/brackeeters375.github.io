const discoverLink = document.getElementById("discover-link");
const languageLink = document.getElementById("language-link");
const loginLink = document.getElementById("login-link");
const secondNav = document.querySelector(".second-sidenav");

function hideSecondNav() {
  secondNav.style.display = "none";
}

function showSecondNav(content) {
  secondNav.style.display = "block";
  secondNav.textContent = "";
  secondNav.appendChild(content);
}

discoverLink.addEventListener("click", () => {
  const panelTextDiscover = document.createElement("a");
  panelTextDiscover.textContent = "Discover Test";
  panelTextDiscover.href = "#";
  showSecondNav(panelTextDiscover);
});

languageLink.addEventListener("click", () => {
  const panelTextLanguage = document.createElement("a");
  panelTextLanguage.textContent = "Language Test (WIP)";
  panelTextLanguage.href = "#";
  showSecondNav(panelTextLanguage);
});

loginLink.addEventListener("click", () => {
  const panelTextLogin = document.createElement("a");
  panelTextLogin.textContent = "Login Test";
  panelTextLogin.href = "#";
  showSecondNav(panelTextLogin);
});

document.addEventListener("click", (event) => {
  if (!secondNav.contains(event.target) && !event.target.closest(".sidenav")) {
    hideSecondNav();
  }
});
