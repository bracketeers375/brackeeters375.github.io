import pool from "./connection.js";


const addAdminToEvent = async (user_id, event_id) => {
    try{
        const result = await pool.query(
            `INSERT INTO Admins (user_id, event_id)
            VALUES ($1, $2)
            RETURNING *`,
            [user_id, event_id]
        );
        
        return result.rows[0];
    }catch(error){
        throw new Error(error);
    }
};

export default{
    addAdminToEvent,
};