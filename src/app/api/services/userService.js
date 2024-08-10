const { pool } = require('../../connection');

const createUser = async (username, email, password) => {
    try {
        const result = await pool.query(
            `INSERT INTO users(username, email, password_hash)
             VALUES ($1, $2, crypt($3, gen_salt('md5')))
             RETURNING *`,
            [username, email, password]
        );
        return result.rows[0];
    } catch (error) {
        switch (error.code) {
            case '23505': // i.e. Duplicate key constraint violated
                 throw new Error("Username or email already exists");
            default:
                console.log(error);
                throw new Error("Database error");

        }
    }
};

const getUserById = async (id) => {
    // TODO
};

const updateUser = async (id, details) => {
    // TODO
};

const deleteUser = async (id) => {
    // TODO
};

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};