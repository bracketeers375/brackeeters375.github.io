DROP DATABASE IF EXISTS local_tournament_db;
CREATE DATABASE local_tournament_db;
\c local_tournament_db;

-- Clean out the database.
DO $$
    DECLARE
        drop_query TEXT;
    BEGIN
        SELECT string_agg(format('DROP TABLE IF EXISTS %I.%I CASCADE;', schemaname, tablename), ' ')
        INTO drop_query
        FROM pg_tables
        WHERE schemaname NOT IN ('pg_catalog', 'information_schema');

        IF drop_query IS NOT NULL THEN
            EXECUTE drop_query;
        END IF;
    END $$;

CREATE TABLE Games
(
    game_id   SERIAL PRIMARY KEY,
    game_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Users
(
    user_id       SERIAL PRIMARY KEY,
    username      VARCHAR(100) UNIQUE NOT NULL,
    email         VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255)        NOT NULL,
    full_name     VARCHAR(100),
    token 				VARCHAR(255) UNIQUE
);

CREATE TABLE Events
(
    event_id   SERIAL PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    start_date DATE         NOT NULL,
    end_date   DATE,
    created_by INT NOT NULL,
    FOREIGN KEY (created_by) REFERENCES Users (user_id)
);

CREATE TABLE Tournaments
(
    tournament_id   SERIAL PRIMARY KEY,
    tournament_name VARCHAR(100) NOT NULL,
    tournament_json JSON,
    tournament_format VARCHAR(100),
    game_id         INT          NOT NULL,
    event_id        INT NOT NULL,
    participant_cap INT NOT NULL,
    registration_deadline   DATE,
    has_started     BOOLEAN,
    FOREIGN KEY (game_id) REFERENCES Games (game_id),
    FOREIGN KEY (event_id) REFERENCES Events (event_id)
);

CREATE TABLE Admins
(
    admin_id			SERIAL PRIMARY KEY,
    user_id				INT NOT NULL,
    event_id      INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    FOREIGN KEY (event_id) REFERENCES Events (event_id)
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

-- dummy data
INSERT INTO Games(game_name)
VALUES ('GUILTY GEAR -STRIVE-');
INSERT INTO Games(game_name)
VALUES ('Street Fighter 6');
INSERT INTO Games(game_name)
VALUES ('TEKKEN 8');
INSERT INTO Games(game_name)
VALUES ('UNDER NIGHT IN-BIRTH II Sys:Celes');
INSERT INTO Games(game_name)
VALUES ('Super Smash Bros. Ultimate');


INSERT INTO Users (username, email, password_hash, full_name, token)
VALUES('Steven', 'steven@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$FiTQA4f5zL6rj3E0cjjaGg$LhNtzB/144jhH95cPTcNtUsZVLcMmzainuvA5WllFgk',
'Steven D', 'f6333d643d372e4b25843b68d0684cf295b4175646a620aa4cb8b8073295d795');
INSERT INTO Users (username, email, password_hash, full_name, token)
VALUES('Alice', 'alice@gmail.com', '', 'Alice Wonderland', '2');
INSERT INTO Users (username, email, password_hash, full_name, token)
VALUES('Bob', 'bob@gmail.com', '', 'Bob Barker', '3');
INSERT INTO Users (username, email, password_hash, full_name, token)
VALUES ('Charlie', 'charlie@gmail.com', '', 'God', '4');
INSERT INTO Users (username, email, password_hash, full_name, token)
VALUES ('David', 'david@gmail.com', '', 'DL', '5');
INSERT INTO Users (username, email, password_hash, full_name, token)
VALUES ('John', 'five@gmail.com', '', 'JG', '6');
INSERT INTO Users (username, email, password_hash, full_name, token)
VALUES ('James', 'six@gmail.com', '', 'J', '7');
INSERT INTO Users (username, email, password_hash, full_name, token)
VALUES ('Sara', 'seven@gmail.com', '', 'S', '8');
INSERT INTO Users (username, email, password_hash, full_name, token)
VALUES ('Joey', 'eight@gmail.com', '', 'J', '9');

INSERT INTO Events (event_name, start_date, end_date, created_by)
VALUES ('My FGC Tournament 2024', '2024-09-06', '2024-09-06', 1),
       ('Go For Broke', '2024-08-05', '2024-08-07', 2),
       ('The Vortex', '2024-08-10', '2024-08-12', 2),
       ('Tekken World Tour', '2024-10-19', '2024-10-19', 2);

INSERT INTO Tournaments(tournament_name, game_id, event_id, participant_cap, tournament_json, has_started, tournament_format)
VALUES ('My Strive Tournament', 1, 1, 16, '{
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
}', 'false', 'double_elimination');

INSERT INTO Tournaments(tournament_name, game_id, event_id, participant_cap, tournament_json, has_started, tournament_format)
VALUES ('TEST TOURNEY 2', 2, 1, 8, '{
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
      "type": "single_elimination",
      "number": 1,
      "settings": {
        "roundRobinMode": "simple",
        "groupCount": 1,
        "size": 8,
        "grandFinal": "none",
        "consolationFinal" : false,
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
}', 'false', 'single_elimination');

INSERT INTO Participants(user_id, username, event_id, tournament_id)
VALUES(2, 'Alice', 1, 1);
INSERT INTO Participants(user_id, username, event_id, tournament_id)
VALUES(3, 'Bob', 1, 1);
INSERT INTO Participants(user_id, username, event_id, tournament_id)
VALUES(4, 'Charlie', 1, 1);
INSERT INTO Participants(user_id, username, event_id, tournament_id)
VALUES(5, 'David', 1, 1);
INSERT INTO Participants(user_id, username, event_id, tournament_id)
VALUES(6, 'John', 1, 1);
INSERT INTO Participants(user_id, username, event_id, tournament_id)
VALUES(7, 'James', 1, 1);
INSERT INTO Participants(user_id, username, event_id, tournament_id)
VALUES(8, 'Sara', 1, 1);
INSERT INTO Participants(user_id, username, event_id, tournament_id)
VALUES(9, 'Joey', 1, 1);

INSERT INTO Participants(user_id, username, event_id, tournament_id)
VALUES(5, 'David', 1, 2);
INSERT INTO Participants(user_id, username, event_id, tournament_id)
VALUES(6, 'John', 1, 2);
INSERT INTO Participants(user_id, username, event_id, tournament_id)
VALUES(5, 'David', 1, 2);
INSERT INTO Participants(user_id, username, event_id, tournament_id)
VALUES(9, 'Joey', 1, 2);