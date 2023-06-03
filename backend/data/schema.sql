-- Create the tables in SQLite
BEGIN;

CREATE TABLE IF NOT EXISTS Trip
(
    trip_id INTEGER PRIMARY KEY AUTOINCREMENT,
    trip_name TEXT NOT NULL,
    trip_start_date TIMESTAMP,
    trip_end_date TIMESTAMP,
    trip_created_date TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS User
(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS TripUserRecord
(
    trip_user_record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    trip_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    role TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS TripAttractionRecord
(
    trip_attraction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    attraction_id INTEGER NOT NULL,
    trip_id INTEGER NOT NULL,
    user_created_id INTEGER NOT NULL,
    added_date TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS CommentRecord
(
    commnet_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    trip_attraction_id INTEGER NOT NULL,
    comment_text text NOT NULL
);

CREATE TABLE IF NOT EXISTS Attraction
(
    attraction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    lat REAL NOT NULL,
    long REAL NOT NULL,
    address NOT NULL,
    description
);

CREATE TABLE IF NOT EXISTS VotingRecord
(
    voting_record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    trip_attraction_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    star_value INTEGER NOT NULL
);

END;