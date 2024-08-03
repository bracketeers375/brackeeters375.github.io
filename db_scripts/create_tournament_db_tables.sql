-- Clean out the database.
DROP TABLE IF EXISTS Results CASCADE;
DROP TABLE IF EXISTS Matches CASCADE;
DROP TABLE IF EXISTS Tournaments CASCADE;
DROP TABLE IF EXISTS Teams CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Organizations CASCADE;
DROP TABLE IF EXISTS Games CASCADE;

-- Recreate Games table.
CREATE TABLE Games
(
    game_id   SERIAL PRIMARY KEY,
    name      VARCHAR(100) NOT NULL,
    genre     VARCHAR(50)  NOT NULL,
    developer VARCHAR(100)
);

-- Recreate Organizations table.
CREATE TABLE Organizations
(
    organization_id SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    type            VARCHAR(50), -- e.g., Team, Club, E-Sports Organization
    contact_email   VARCHAR(100),
    website         VARCHAR(255)
);

-- Recreate Users table.
CREATE TABLE Users
(
    user_id         SERIAL PRIMARY KEY,
    username        VARCHAR(100) UNIQUE NOT NULL,
    email           VARCHAR(100) UNIQUE NOT NULL,
    password_hash   VARCHAR(255)        NOT NULL,
    full_name       VARCHAR(100),
    role            VARCHAR(50), -- e.g., Player, Coach, Admin
    organization_id INT,
    FOREIGN KEY (organization_id) REFERENCES Organizations (organization_id)
);

-- Recreate Teams table.
CREATE TABLE Teams
(
    team_id         SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    organization_id INT,
    coach_id        INT,
    FOREIGN KEY (organization_id) REFERENCES Organizations (organization_id),
    FOREIGN KEY (coach_id) REFERENCES Users (user_id)
);

-- Recreate Tournaments table.
CREATE TABLE Tournaments
(
    tournament_id   SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    game_id         INT          NOT NULL,
    start_date      DATE         NOT NULL,
    end_date        DATE         NOT NULL,
    description     TEXT,
    organization_id INT,
    coach_id        INT,
    FOREIGN KEY (game_id) REFERENCES Games (game_id),
    FOREIGN KEY (organization_id) REFERENCES Organizations (organization_id),
    FOREIGN KEY (coach_id) REFERENCES Users (user_id)
);

-- Recreate Matches table.
CREATE TABLE Matches
(
    match_id      SERIAL PRIMARY KEY,
    tournament_id INT,
    team1_id      INT,
    team2_id      INT,
    date          TIMESTAMP NOT NULL,
    settings      JSON,
    FOREIGN KEY (tournament_id) REFERENCES Tournaments (tournament_id),
    FOREIGN KEY (team1_id) REFERENCES Teams (team_id),
    FOREIGN KEY (team2_id) REFERENCES Teams (team_id)
);

-- Recreate Results table.
CREATE TABLE Results
(
    result_id   SERIAL PRIMARY KEY,
    match_id    INT,
    team1_score INT,
    team2_score INT,
    winner      INT,
    details     JSON,
    FOREIGN KEY (match_id) REFERENCES Matches (match_id),
    FOREIGN KEY (winner) REFERENCES Teams (team_id)
);