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

-- Recreate Games table.
CREATE TABLE Games
(
    game_id   SERIAL PRIMARY KEY,
    game_name VARCHAR(100) UNIQUE NOT NULL,
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
    full_name       VARCHAR(100),
    token			VARCHAR(255)
);

-- Recreate Tournaments table.
CREATE TABLE Tournaments
(
    tournament_id   SERIAL PRIMARY KEY,
    tournament_name            VARCHAR(100) NOT NULL,
    start_date      DATE         NOT NULL,
    end_date        DATE         NOT NULL,
    description     TEXT
);

CREATE TABLE Events
(
    event_id    SERIAL PRIMARY KEY,
    event_name  TEXT,
    game_id     INT,
    game_name   TEXT,
    tournament_id INT,
    FOREIGN KEY (game_id) REFERENCES Games (game_id),
    FOREIGN KEY (game_name) REFERENCES Games (game_name),
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
    game_id         INT,
    game_name       VARCHAR(100),
    tournament_id   INT,
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    FOREIGN KEY (username) REFERENCES Users (username),
    FOREIGN KEY (event_id) REFERENCES Events (event_id),
    FOREIGN KEY (tournament_id) REFERENCES Tournaments (tournament_id),
    FOREIGN KEY (game_id) REFERENCES Games (game_id),
    FOREIGN KEY (game_name) REFERENCES Games (game_name)
);

CREATE TABLE Admins
(
    admin_id        SERIAL PRIMARY KEY,
    tournament_id   INT,
    user_id         INT,
    FOREIGN KEY (tournament_id) REFERENCES Tournaments (tournament_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- dummy data
INSERT INTO Games(game_name, genre)
VALUES('GGST', 'Fighting');
INSERT INTO Games(game_name, genre)
VALUES('SF6', 'Fighting');

INSERT INTO tournaments(tournament_name, start_date, end_date, description)
VALUES('my tourney', '2024-08-10', '2024-08-11', 'Welcome to my tourney');
INSERT INTO tournaments(tournament_name, start_date, end_date, description)
VALUES('TOURNEY 2', '2024-08-24', '2024-08-24', 'Di6');

INSERT INTO events(event_name, game_id, game_name, tournament_id)
VALUES('GGST TOURNEY', 1, 'GGST', 1);
INSERT INTO events(event_name, game_id, game_name, tournament_id)
VALUES('SF6 TOURNEY', 2, 'SF6', 1);
INSERT INTO events(event_name, game_id, game_name, tournament_id)
VALUES('GGST TOURNEY DI6', 1, 'GGST', 2);

INSERT INTO USERS(username, email, password_hash)
VALUES('bob', 'bob@gmail.com', '$1$tQYTwdjo$T/JkKXeULiiSNyfp4du9j.');
INSERT INTO USERS(username, email, password_hash)
VALUES('alice', 'alice@gmail.com', 'fakeHash');


INSERT INTO Participants(user_id, username, event_id, tournament_id, game_id, game_name)
VALUES(1, 'bob', 1, 1, 1, 'GGST');
INSERT INTO Participants(user_id, username, event_id, tournament_id, game_id, game_name)
VALUES(2, 'alice', 1, 1, 1, 'GGST');
INSERT INTO Participants(user_id, username, event_id, tournament_id, game_id, game_name)
VALUES(2, 'alice', 2, 1, 2, 'SF6');
INSERT INTO Participants(user_id, username, event_id, tournament_id, game_id, game_name)
VALUES(2, 'alice', 2, 2, 1, 'GGST');