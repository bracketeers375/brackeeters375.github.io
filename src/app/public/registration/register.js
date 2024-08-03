let submit = document.getElementById("submit");

let usernameIn = document.getElementById("username");
let emailIn = document.getElementById("email");
let cemailIn = document.getElementById("cemail");
let passwordIn = document.getElementById("password");
let cpasswordIn = document.getElementById("cpassword");
let username;
let email;
let cemail;
let password;
let cpassword;

submit.addEventListener("click", userPost);

function userPost () {
    username = usernameIn.value;
    email = emailIn.value;
    cemail = cemailIn.value;
    password = passwordIn.value;
    cpassword = cpasswordIn.value;

    fetch("/api/users/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            cemail: cemail,
            password: password,
            cpassword: cpassword
        }),
    }).then(response => {
        console.log("Response received: ", response.status);
        console.log("responese: ", response);
        let message = document.getElementById("message");
        let pEle = document.getElementById("messageTxt");

        if(pEle === null) {
            pEle = document.createElement("p");
            pEle.id = "messageTxt";
        }

        if(response.status != 200) {
            pEle.textContent = "Success";
        } else {
            pEle.textContent = "MISTAKES WERE MADE";
        }

    }).catch(error => {
        console.log(error);
    });
}
