--
CREATE DATABASE local_tournament_db;
\c local_tournament_db;

-- Clean out the database.
DROP TABLE IF EXISTS Admins CASCADE;
DROP TABLE IF EXISTS Participants CASCADE;
DROP TABLE IF EXISTS Matches CASCADE;
DROP TABLE IF EXISTS Stages CASCADE;
DROP TABLE IF EXISTS Events CASCADE;
DROP TABLE IF EXISTS Tournaments CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Games CASCADE;
CREATE EXTENSION pgcrypto ;

-- Recreate Games table.
CREATE TABLE Games
(
    game_id   SERIAL PRIMARY KEY,
    name      VARCHAR(100) NOT NULL,
    genre     VARCHAR(50)  NOT NULL,
    developer VARCHAR(100)
);

-- Recreate Users table.
CREATE TABLE Users
(
    user_id         SERIAL PRIMARY KEY,
    username        VARCHAR(100) UNIQUE NOT NULL,
    email           VARCHAR(100) UNIQUE NOT NULL,
    password_hash   VARCHAR(255)        NOT NULL,
    full_name       VARCHAR(100)
);

-- Recreate Tournaments table.
CREATE TABLE Tournaments
(
    tournament_id   SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    start_date      DATE         NOT NULL,
    end_date        DATE         NOT NULL,
    description     TEXT
);

CREATE TABLE Events
(
    event_id    SERIAL PRIMARY KEY,
    event_name  TEXT,
    game_id     INT,
    tournament_id INT,
    FOREIGN KEY (game_id) REFERENCES Games (game_id),
    FOREIGN KEY (tournament_id) REFERENCES Tournaments (tournament_id)
);

CREATE TABLE Stages
(
    stage_id        SERIAL PRIMARY KEY,
    stage_name      TEXT,
    bracket_type    TEXT
);

-- Recreate Matches table.
CREATE TABLE Matches
(
    match_id        SERIAL PRIMARY KEY,
    tournament_id   INT,
    event_id        INT,
    stage_id        INT,
    round_num       INT,
    match_num       INT,
    player1_id      INT,
    player2_id      INT,
    player1_name    TEXT,
    player2_name    TEXT,
    winner_next_match_id    INT,
    loser_next_match_id     INT,
    date          TIMESTAMP NOT NULL,
    FOREIGN KEY (tournament_id) REFERENCES Tournaments (tournament_id),
    FOREIGN KEY (event_id) REFERENCES Events (event_id),
    FOREIGN KEY (stage_id) REFERENCES Stages (stage_id),
    FOREIGN KEY (winner_next_match_id) REFERENCES Matches (match_id),
    FOREIGN KEY (loser_next_match_id) REFERENCES Matches (match_id)
);

CREATE TABLE Participants
(
    participants_id SERIAL PRIMARY KEY,
    user_id         INT,
    username        VARCHAR(100),
    seed            INT,
    event_id        INT,
    tournament_id   INT,
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    FOREIGN KEY (username) REFERENCES Users (username),
    FOREIGN KEY (event_id) REFERENCES Events (event_id),
    FOREIGN KEY (tournament_id) REFERENCES Tournaments (tournament_id)
);

CREATE TABLE Admins
(
    admin_id        SERIAL PRIMARY KEY,
    tournament_id   INT,
    user_id         INT,
    FOREIGN KEY (tournament_id) REFERENCES Tournaments (tournament_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);