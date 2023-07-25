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

CREATE TABLE IF NOT EXISTS Attraction
(
    attraction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    address NOT NULL,
    description
);

CREATE TABLE IF NOT EXISTS TripAttractionRecord
(
    trip_attraction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    attraction_id INTEGER NOT NULL,
    trip_id INTEGER NOT NULL,
    user_created_id INTEGER NOT NULL,
    added_date TIMESTAMP NOT NULL,
    FOREIGN KEY (user_created_id) REFERENCES User(user_id),
    FOREIGN KEY (trip_id) REFERENCES Trip(trip_id),
    FOREIGN KEY (attraction_id) REFERENCES Attraction(attraction_id)
);

CREATE TABLE IF NOT EXISTS TripItinerary
(
    trip_itinerary_id INTEGER PRIMARY KEY AUTOINCREMENT,
    trip_id INTEGER NOT NULL,
    trip_attraction_id INTEGER NOT NULL,
    scheduled_date TIMESTAMP NOT NULL,
    FOREIGN KEY (trip_id) REFERENCES Trip(trip_id),
    FOREIGN KEY (trip_attraction_id) REFERENCES TripAttractionRecord(trip_attraction_id)
);

CREATE TABLE IF NOT EXISTS TripUserRecord
(
    trip_user_record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    trip_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    role TEXT NOT NULL,
    UNIQUE(trip_id, user_id, role),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (trip_id) REFERENCES Trip(trip_id)
);

CREATE TABLE IF NOT EXISTS CommentRecord
(
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    trip_attraction_id INTEGER NOT NULL,
    comment_text text NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (trip_attraction_id) REFERENCES TripAttractionRecord(trip_attraction_id)
);


CREATE TABLE IF NOT EXISTS VotingRecord
(
    voting_record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    trip_attraction_id INTEGER NOT NULL,
    star_value INTEGER NOT NULL,
    FOREIGN KEY (trip_attraction_id) REFERENCES TripAttractionRecord(trip_attraction_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

PRAGMA foreign_keys = ON;

END;