const loginLink = document.getElementById("login-link");
const searchLink = document.getElementById("search-link");
const homeLink = document.getElementById("home-link");
const secondNav = document.querySelector(".second-sidenav");

function hideSecondNav() {
  secondNav.style.display = "none";
}

homeLink.addEventListener("click", () => {
  window.location.href = "/";
});

searchLink.addEventListener("click", () => {
  window.location.href = "/search";
});

loginLink.addEventListener("click", () => {
  window.location.href = "/login";
});

document.addEventListener("click", (event) => {
  if (!secondNav.contains(event.target) && !event.target.closest(".sidenav")) {
    hideSecondNav();
  }
});
