let submit = document.getElementById("submit");

let usernameIn = document.getElementById("username");
let passwordIn = document.getElementById("password");
let username;
let password;

submit.addEventListener("click", sendLoginInfo);

function sendLoginInfo() {
  username = usernameIn.value;
  password = passwordIn.value;

  fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password
    }),
  })
    .then((response) => {
    	return response.status;
    })
    .catch((error) => {
      console.log(error);
    });
}
