import sqlite3

def get_db_connections():
    connection = sqlite3.connect("data/database.db")
    connection.row_factory = sqlite3.Row
    return connection