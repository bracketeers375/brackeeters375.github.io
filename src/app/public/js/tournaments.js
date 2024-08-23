let testCreateBtn = document.getElementById("testCreate");
testCreateBtn.addEventListener("click", createTest);

function createTest() {

    fetch("api/tournaments/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            t_name: "test tournament",
            g_id: 1,
            e_id: 1,
            }),
    })
    .then((response) => {
        console.log("response: ", response);

    })
    .catch((error) => {
        console.log(error);
    });

}