import sqlite3, json, os
from datetime import datetime
import os

"""
Initiate database and insert mock data for development
"""

DB_PATH = "data/database.db"

# Delte database if exists
if os.path.exists(DB_PATH):
    os.remove(DB_PATH)
else:
    print("The file does not exist")

# Establish connection
connection = sqlite3.connect(DB_PATH)

with open("data/schema.sql") as f:
    connection.executescript(f.read())

cur = connection.cursor()

# User Data
init_user_data = [
    ("Harvey", "harvey@email.com"),
    ("Jonah", "jonah@email.com"),
    ("Ethan", "ethan@email.com"),
]

for user_data in init_user_data:
    cur.execute("INSERT INTO USER (name, email) VALUES (?, ?)", user_data)

# Attraction Data
with open("data/vancouver_attractions.json", encoding="utf8") as f:
    data = json.load(f)
    for poi in data["poi"]:
        if "Description" in poi:
            cur.execute(
                f"INSERT INTO Attraction (name, type, lat, lon, address, description) VALUES (?, ?, ?, ?, ?, ?)",
                (
                    poi["Poiname"],
                    poi["customType"],
                    poi["wLat"],
                    poi["wLon"],
                    poi["Address"],
                    poi["Description"],
                ),
            )
        else:
            cur.execute(
                f"INSERT INTO Attraction (name, type, lat, lon, address) VALUES (?, ?, ?, ?, ?)",
                (
                    poi["Poiname"],
                    poi["customType"],
                    poi["wLat"],
                    poi["wLon"],
                    poi["Address"],
                ),
            )

# Trip and Trip User Records
now = datetime.now()
connection.execute(
    "INSERT INTO Trip (trip_name, trip_created_date) VALUES (?, ?)",
    ("Greater Vancouver Trip", now),
)
connection.execute(
    "INSERT INTO TripUserRecord (trip_id, user_id, role) VALUES (?, ?, ?)",
    (1, 1, "Owner")
)

# Add attraction to trip
for i in range(1, 51):
    connection.execute(
        "INSERT INTO TripAttractionRecord (attraction_id, trip_id, user_created_id, added_date) VALUES (?, ?, ?, ?)",
        (i, 1, 1, now),
    )


# Add comments
connection.execute(
    "INSERT INTO CommentRecord (user_id, trip_attraction_id, comment_text) VALUES (?, ?, ?)",
    (1, 1, "Must go to this place"),
)

# Add voting
connection.execute(
    "INSERT INTO VotingRecord (user_id, trip_attraction_id, star_value) VALUES (?, ?, ?)",
    (1, 1, 10),
)

connection.commit()
connection.close()
