DROP DATABASE IF EXISTS local_tournament_db;
CREATE DATABASE local_tournament_db;
\c local_tournament_db;

-- Clean out the database.
DROP TABLE IF EXISTS Tournaments CASCADE;
DROP TABLE IF EXISTS Events CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Games CASCADE;

-- Recreate Games table.
CREATE TABLE Games
(
    game_id   SERIAL PRIMARY KEY,
    game_name VARCHAR(100) UNIQUE NOT NULL
);

-- Recreate Users table.
CREATE TABLE Users
(
    user_id         SERIAL PRIMARY KEY,
    username        VARCHAR(100) UNIQUE NOT NULL,
    email           VARCHAR(100) UNIQUE NOT NULL,
    password_hash   VARCHAR(255)        NOT NULL
);

-- Recreate Events table.
CREATE TABLE Events
(
    event_id   SERIAL PRIMARY KEY,
    event_name            VARCHAR(100) NOT NULL,
    -- start_date      DATE         NOT NULL,
    -- end_date        DATE         NOT NULL,
    description     TEXT
);

CREATE TABLE Tournaments
(
    tournament_id    SERIAL PRIMARY KEY,
    tournament_name  TEXT,
    game_id     INT,
    -- game_name   TEXT,
    event_id INT,
    FOREIGN KEY (game_id) REFERENCES Games (game_id),
    -- FOREIGN KEY (game_name) REFERENCES Games (game_name),
    FOREIGN KEY (event_id) REFERENCES Events (event_id)
);

-- CREATE TABLE Participants
-- (
--     participants_id SERIAL PRIMARY KEY,
--     user_id         INT,
--     username        VARCHAR(100),
--     seed            INT,
--     event_id        INT,
--     game_id         INT,
--     game_name       VARCHAR(100),
--     tournament_id   INT,
--     FOREIGN KEY (user_id) REFERENCES Users (user_id),
--     FOREIGN KEY (username) REFERENCES Users (username),
--     FOREIGN KEY (event_id) REFERENCES Events (event_id),
--     FOREIGN KEY (tournament_id) REFERENCES Tournaments (tournament_id),
--     FOREIGN KEY (game_id) REFERENCES Games (game_id),
--     FOREIGN KEY (game_name) REFERENCES Games (game_name)
-- );