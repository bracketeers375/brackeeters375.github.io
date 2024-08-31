import express from "express";
import adminsService from "../services/adminsService.js";

const addAdminToEvent = async (req, res) => {
    const event_id = req.params.event_id;
    const user = req.body;
    console.log(user);
    try{
        let result = await adminsService.addAdminToEvent(user.user_id, event_id);
        if(!result)
            return res.status(500).send("Could not add admin");

        return res.send(result);
    }catch(error){
        console.log(error);
        return res.send(error);
    }
}

const adminRouter = express.Router();

adminRouter.post("/add/:event_id", addAdminToEvent);

export default adminRouter;