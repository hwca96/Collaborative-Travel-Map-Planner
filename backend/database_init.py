import sqlite3, json

connection = sqlite3.connect('data/database.db')

with open('data/schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

# User Data
cur.execute("INSERT INTO USER (name, email) VALUES (?, ?)",
            ('Harvey', 'harvey@email.com')
            )

cur.execute("INSERT INTO USER (name, email) VALUES (?, ?)",
            ('Jonah', 'jonah@email.com')
            )

cur.execute("INSERT INTO USER (name, email) VALUES (?, ?)",
            ('Ethan', 'ethan@email.com')
            )

# Attraction Data
with open("data/vancouver_attractions.json", encoding="utf8") as f:
    data = json.load(f)
    for poi in data['poi']:
        if "Description" in poi:
            cur.execute(f"INSERT INTO Attraction (name, type, lat, long, address, description) VALUES (?, ?, ?, ?, ?, ?)",
                        (poi['Poiname'], poi['customType'], poi['wLat'], poi['wLon'], poi['Address'], poi['Description'])
                )
        else:
            cur.execute(f"INSERT INTO Attraction (name, type, lat, long, address) VALUES (?, ?, ?, ?, ?)",
                        (poi['Poiname'], poi['customType'], poi['wLat'], poi['wLon'], poi['Address'])
                )

connection.commit()
connection.close()