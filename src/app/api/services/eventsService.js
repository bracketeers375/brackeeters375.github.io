import pool from "./connection.js";

const createEvent = async (eventName, startDate, endDate = null) => {
    try {
        const result = await pool.query(
            `INSERT INTO Events(event_name, start_date, end_date)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [eventName, startDate, endDate]
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
            throw new Error("Event not found");
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
      WHERE start_date < CURRENT_DATE AND
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
    getEventByTournamentId
};