let nameElem = document.getElementById("name");
let startElem = document.getElementById("start");
let endElem = document.getElementById("end");
let btn = document.getElementById("submit");
btn.addEventListener("click", async () => {
    let user;
    try{
        user = await fetch("../../api/users/token").then((response) => {
            return response.json();
        }).catch(error => {
            console.log(error);
            return error;
        });
        if(!user)
            throw new Error("No token available");
    } catch(error){
        return error;
    }

                
    fetch("../../api/events/create" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            event_name: nameElem.value,
            start_date: startElem.value,
            end_date: endElem.value
        }),
                    
    }).then((eventResponse) => {
        if(eventResponse.status != 201){
            return eventResponse;
        }
        return eventResponse.json();
    }).then((body) => {
        console.log(body);
		fetch(`../../api/admins/add/${body.event_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: user.user_id}),
        }).then((adminResponse) => {
			return adminResponse;
        }).catch(error => {
            console.log(error);
            return error;
        });
    });
            	
});