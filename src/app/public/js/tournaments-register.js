
let submit = document.getElementById("submit");
let message = document.getElementById("message");
let success;
const register = async () => {
    let checkedCount = 0;
    let user = await fetch(`../../api/users/token`).then((response) => {return response.json();});
    success = true;
    let boxes = document.getElementsByName("events");
    for(let i = 0 ; i < boxes.length ; i++){
        let event = data[i];
		if(boxes[i].checked){
            console.log(i);
            checkedCount++;
            let result = await fetch(`../../api/participants/add/${event.event_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
					user_id: user.user_id,
					username: user.username,
                    event_id: event.event_id,
                    tourn_id: event.tournament_id,
                    game_id: event.game_id,
                    game_name: event.game_name,
                })
            });

            if(result.status === 200)
                console.log(`Event ${event.event_id}: Registered`);
            else{
                success = false;
                console.log("Failure");
            }
            	
            
        }
    }
    if(success)
     	message.textContent = `Successfully ${user.username} added to ${checkedCount} event(s)`;
    else
    	message.textContent = `Failed to add ${user.username} to events`;
};

submit.addEventListener("click", register);

