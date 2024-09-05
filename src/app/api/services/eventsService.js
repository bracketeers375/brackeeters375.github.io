import pool from "./connection.js";
import userService from "./userService.js";

const createEvent = async (eventName, startDate, endDate = null, userId) => {
    try {
        const result = await pool.query(
            `INSERT INTO Events(event_name, start_date, end_date, created_by)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [eventName, startDate, endDate, userId]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Database error during event creation:", error);
        throw new Error("Database error during event creation");
    }
};

const getEventById = async (eventId) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM Events
             WHERE event_id = $1`,
            [eventId]
        );
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (error) {
        console.error("Database error during event retrieval:", error);
        throw new Error("Database error during event retrieval");
    }
};

const getAllClosedEvents = async () => {
    try {
        const result = await pool.query(`
      SELECT * 
      FROM Events
      WHERE end_date < CURRENT_DATE
      ORDER BY end_date DESC
    `);
        return result.rows;
    } catch (error) {
        console.error("Database error during closed events retrieval:", error);
        throw new Error("Database error during closed events retrieval");
    }
};

const getAllUpcomingEvents = async () => {
    try {
        const result = await pool.query(`
      SELECT * 
      FROM Events
      WHERE start_date > CURRENT_DATE
      ORDER BY start_date DESC
    `);
        return result.rows;
    } catch (error) {
        console.error("Database error during upcoming events retrieval:", error);
        throw new Error("Database error during upcoming events retrieval");
    }
};

const getAllOpenEvents = async () => {
    try {
        const result = await pool.query(`
      SELECT * 
      FROM Events
      WHERE start_date <= CURRENT_DATE AND
            end_date >= CURRENT_DATE
      ORDER BY end_date DESC
    `);
        return result.rows;
    } catch (error) {
        console.error("Database error during open events retrieval:", error);
        throw new Error("Database error during open events retrieval");
    }
};

const getAllEvents = async () => {
    try {
        const result = await pool.query(`
      SELECT * 
      FROM Events
      ORDER BY end_date DESC
    `);
        return result.rows;
    } catch (error) {
        console.error("Database error during events retrieval:", error);
        throw new Error("Database error during events retrieval");
    }
};

const updateEvent = async (eventId, details) => {
    let queryString = "UPDATE Events SET ";
    if (!details) throw new Error("No details provided");

    let paramNumber = 1;
    let args = [];

    if (details.hasOwnProperty("event_name")) {
        queryString += `event_name = \$${paramNumber}, `;
        args.push(details.event_name);
        paramNumber++;
    }

    if (details.hasOwnProperty("start_date")) {
        queryString += `start_date = \$${paramNumber}, `;
        args.push(details.start_date);
        paramNumber++;
    }

    if (details.hasOwnProperty("end_date")) {
        queryString += `end_date = \$${paramNumber}`;
        args.push(details.end_date);
        paramNumber++;
    }

    queryString += ` WHERE event_id = \$${paramNumber} RETURNING *`;
    args.push(parseInt(eventId));

    try {
        const result = await pool.query(queryString, args);
        return result.rows[0];
    } catch (error) {
        console.error("Could not query database", error);
        throw new Error("Database error during event update");
    }
};

const deleteEvent = async (eventId) => {
    try {
        await pool.query(`DELETE
                          FROM Events
                          WHERE event_id = $1`, [eventId]);
        return {message: "Event deleted successfully"};
    } catch (error) {
        console.error("Database error during event deletion:", error);
        throw new Error("Database error during event deletion");
    }
};

const getTournamentsForEvent = async (eventId) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM Tournaments
             WHERE event_id = $1`,
            [eventId]
        );
        return result.rows;
    } catch (error) {
        console.error("Database error during tournaments retrieval:", error);
        throw new Error("Database error during tournaments retrieval");
    }
};

const getEventByTournamentId = async (tournamentId) => {
    try {
        const result = await pool.query(
            `SELECT e.*
             FROM Events e
                      JOIN Tournaments t ON e.event_id = t.event_id
             WHERE t.tournament_id = $1`,
            [tournamentId]
        );

        if (result.rows.length === 0) {
            throw new Error("Event not found for the given tournament ID");
        }

        return result.rows[0];
    } catch (error) {
        console.error("Database error during event retrieval by tournament ID:", error);
        throw new Error("Database error during event retrieval by tournament ID");
    }
};

const registerUserForEvent = async (event_id, token) => {
    const user = await userService.getUserByToken(token);
    if (!user) {
        throw new Error("No user found.");
    }

    const event = getEventById(event_id);
    if (!event) {
        throw new Error("No event found.");
    }

    const query = 'INSERT INTO EventRegistrants(user_id, event_id) VALUES($1, $2)';

    try {
        await pool.query(query, [user.user_id, event_id]);
    } catch (error) {
        console.log(error);
        throw new Error("Database error");
    }
};

const dropUserFromEvent = async(event_id, token) => {
    const user = await userService.getUserByToken(token);
    if (!user) {
        throw new Error("No user found.");
    }

    const event = getEventById(event_id);
    if (!event) {
        throw new Error("No event found.");
    }

    const query = {
        text: "DELETE FROM EventRegistrants WHERE user_id = $1 AND event_id = $2",
        values: [user.user_id, event_id]
    };

    try {
        await pool.query(query);
    } catch (error) {
        console.log(error);
        throw new Error("Database error");
    }
};

const getRegisteredUsersForEvent = async (event_id) => {
    const event = getEventById(event_id);
    if (!event) {
        throw new Error("No event found.");
    }

    const query = 'SELECT * FROM EventRegistrantDetails WHERE event_id = $1';
    try {
        const result = await pool.query(query, [event_id]);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw new Error("Database error");
    }
}

const isUserRegisteredForEvent = async (event_id, token) => {
    const user = await userService.getUserByToken(token);
    if (!user) {
        throw new Error("No user found.");
    }

    const event = getEventById(event_id);
    if (!event) {
        throw new Error("No event found.");
    }

    const query = {
        text: "SELECT EXISTS (SELECT 1 FROM EventRegistrants WHERE user_id = $1 AND event_id = $2)",
        values: [user.user_id, event_id]
    };
    try {
        const result = await pool.query(query);
        return result.rows[0].exists;
    } catch (error) {
        console.log(error);
        throw new Error("Database error");
    }
}

export default {
    createEvent,
    getEventById,
    getAllOpenEvents,
    getAllClosedEvents,
    getAllUpcomingEvents,
    getAllEvents,
    updateEvent,
    deleteEvent,
    getTournamentsForEvent,
    getEventByTournamentId,
    registerUserForEvent,
    dropUserFromEvent,
    getRegisteredUsersForEvent,
    isUserRegisteredForEvent
};