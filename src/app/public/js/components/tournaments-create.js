// Grab the HTML elements from the form
let tournamentNameElem = document.getElementById("tournamentName");
let gameIdElem = document.getElementById("gameId");
let eventIdElem = document.getElementById("eventId");
let btn = document.querySelector("form button[type='submit']"); // Select the form's submit button

btn.addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent the default form submission

    let user;
    try {
        // Fetch the current user's token or details
        user = await fetch("../../api/users/token").then((response) => {
            return response.json();
        }).catch(error => {
            console.log(error);
            return error;
        });
        
        if (!user)
            throw new Error("No user token available");
    } catch (error) {
        console.error("Error fetching user:", error);
        return error;
    }

    // Create the tournament by making a POST request to the API
    fetch("../../api/tournaments/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tournament_name: tournamentNameElem.value,
            game_id: gameIdElem.value,
            event_id: eventIdElem.value,
        }),
    }).then((tournamentResponse) => {
        if (tournamentResponse.status !== 201) {
            console.error("Failed to create tournament");
            return tournamentResponse;
        }
        return tournamentResponse.json();
    }).then((body) => {
        console.log("Tournament created successfully:", body);

        // Optionally, add the current user as an admin for the tournament
        fetch(`../../api/admins/add/${body.tournament_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: user.user_id }),
        }).then((adminResponse) => {
            if (adminResponse.status !== 201) {
                console.error("Failed to add admin for the tournament");
            }
            return adminResponse.json();
        }).then((adminBody) => {
            console.log("Admin added:", adminBody);
        }).catch(error => {
            console.error("Error adding admin:", error);
        });
    }).catch(error => {
        console.error("Error creating tournament:", error);
    });
});
