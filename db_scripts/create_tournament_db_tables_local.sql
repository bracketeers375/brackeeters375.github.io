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
    user_id       SERIAL PRIMARY KEY,
    username      VARCHAR(100) UNIQUE NOT NULL,
    email         VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255)        NOT NULL,
    full_name     VARCHAR(100),
    token 				VARCHAR(255) UNIQUE
);

-- Recreate Events table.
CREATE TABLE Events
(
    event_id   SERIAL PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    start_date DATE         NOT NULL,
    end_date   DATE
);

CREATE TABLE Tournaments
(
    tournament_id   SERIAL PRIMARY KEY,
    tournament_name VARCHAR(100) NOT NULL,
    tournament_json JSON,
    game_id         INT          NOT NULL,
    -- game_name   TEXT,
    event_id        INT,
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

-- dummy data
INSERT INTO Games(game_name)
VALUES ('GGST');
INSERT INTO Games(game_name)
VALUES ('SF6');

INSERT INTO Events (event_name, start_date, end_date)
VALUES ('Rocket League Championship 2024', '2024-08-01', '2024-08-03'),
       ('Super Smash Bros Tournament', '2024-08-05', '2024-08-07'),
       ('Street Fighter V Championship', '2024-08-10', '2024-08-12'),
       ('Tekken World Tour', '2024-08-15', '2024-08-17'),
       ('Call of Duty: Warzone Event', '2024-08-20', '2024-08-22'),
       ('League of Legends Championship', '2024-08-25', '2024-08-27'),
       ('Dota 2 International', '2024-09-01', '2024-09-03'),
       ('FIFA World Cup eSports', '2024-09-05', '2024-09-07'),
       ('Fortnite Battle Royale', '2024-09-10', '2024-09-12'),
       ('Apex Legends Global Series', '2024-09-15', '2024-09-17'),
       ('Overwatch League Finals', '2024-09-20', '2024-09-22'),
       ('Valorant Champions Tour', '2024-09-25', '2024-09-27'),
       ('PUBG Global Championship', '2024-10-01', '2024-10-03'),
       ('Hearthstone Masters', '2024-10-05', '2024-10-07'),
       ('Counter-Strike: Global Offensive Major', '2024-10-10', '2024-10-12'),
       ('Rainbow Six Siege Invitational', '2024-10-15', '2024-10-17'),
       ('Magic: The Gathering Arena Championship', '2024-10-20', '2024-10-22'),
       ('Smite World Championship', '2024-10-25', '2024-10-27'),
       ('Gears of War Pro Circuit', '2024-10-30', '2024-11-01'),
       ('Mortal Kombat 11 Pro Kompetition', '2024-11-05', '2024-11-07'),
       ('Halo Championship Series', '2024-11-10', '2024-11-12'),
       ('Heroes of the Storm Global Championship', '2024-11-15', '2024-11-17');

INSERT INTO Tournaments(tournament_name, game_id, event_id, tournament_json)
VALUES ('TEST GGST', 1, 1, '{
  "participant": [
    {
      "id": 0,
      "tournament_id": 0,
      "name": "Player 0"
    },
    {
      "id": 1,
      "tournament_id": 0,
      "name": "Player 1"
    },
    {
      "id": 2,
      "tournament_id": 0,
      "name": "Player 2"
    },
    {
      "id": 3,
      "tournament_id": 0,
      "name": "Player 3"
    },
    {
      "id": 4,
      "tournament_id": 0,
      "name": "Player 4"
    },
    {
      "id": 5,
      "tournament_id": 0,
      "name": "Player 5"
    },
    {
      "id": 6,
      "tournament_id": 0,
      "name": "Player 6"
    },
    {
      "id": 7,
      "tournament_id": 0,
      "name": "Player 7"
    }
  ],
  "stage": [
    {
      "id": 0,
      "tournament_id": 0,
      "name": "Example name",
      "type": "double_elimination",
      "number": 1,
      "settings": {
        "roundRobinMode": "simple",
        "groupCount": 1,
        "size": 8,
        "grandFinal": "none",
        "matchesChildCount": 0,
        "seedOrdering": [
          "inner_outer",
          "natural",
          "reverse"
        ]
      }
    }
  ],
  "group": [
    {
      "id": 0,
      "stage_id": 0,
      "number": 1
    },
    {
      "id": 1,
      "stage_id": 0,
      "number": 2
    }
  ],
  "round": [
    {
      "id": 0,
      "number": 1,
      "stage_id": 0,
      "group_id": 0
    },
    {
      "id": 1,
      "number": 2,
      "stage_id": 0,
      "group_id": 0
    },
    {
      "id": 2,
      "number": 3,
      "stage_id": 0,
      "group_id": 0
    },
    {
      "id": 3,
      "number": 1,
      "stage_id": 0,
      "group_id": 1
    },
    {
      "id": 4,
      "number": 2,
      "stage_id": 0,
      "group_id": 1
    },
    {
      "id": 5,
      "number": 3,
      "stage_id": 0,
      "group_id": 1
    },
    {
      "id": 6,
      "number": 4,
      "stage_id": 0,
      "group_id": 1
    }
  ],
  "match": [
    {
      "id": 0,
      "number": 1,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 0,
      "child_count": 0,
      "status": 2,
      "opponent1": {
        "id": 0,
        "position": 1
      },
      "opponent2": {
        "id": 7,
        "position": 8
      }
    },
    {
      "id": 1,
      "number": 2,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 0,
      "child_count": 0,
      "status": 2,
      "opponent1": {
        "id": 3,
        "position": 4
      },
      "opponent2": {
        "id": 4,
        "position": 5
      }
    },
    {
      "id": 2,
      "number": 3,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 0,
      "child_count": 0,
      "status": 2,
      "opponent1": {
        "id": 1,
        "position": 2
      },
      "opponent2": {
        "id": 6,
        "position": 7
      }
    },
    {
      "id": 3,
      "number": 4,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 0,
      "child_count": 0,
      "status": 2,
      "opponent1": {
        "id": 2,
        "position": 3
      },
      "opponent2": {
        "id": 5,
        "position": 6
      }
    },
    {
      "id": 4,
      "number": 1,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 1,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 5,
      "number": 2,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 1,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 6,
      "number": 1,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 2,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 7,
      "number": 1,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 3,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null,
        "position": 1
      },
      "opponent2": {
        "id": null,
        "position": 2
      }
    },
    {
      "id": 8,
      "number": 2,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 3,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null,
        "position": 3
      },
      "opponent2": {
        "id": null,
        "position": 4
      }
    },
    {
      "id": 9,
      "number": 1,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 4,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null,
        "position": 2
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 10,
      "number": 2,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 4,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null,
        "position": 1
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 11,
      "number": 1,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 5,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 12,
      "number": 1,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 6,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null,
        "position": 1
      },
      "opponent2": {
        "id": null
      }
    }
  ],
  "match_game": []
}');

