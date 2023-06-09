import sqlite3

def get_db_connections():
    connection = sqlite3.connect("data/database.db")
    connection.row_factory = sqlite3.Row
    return connection

def get_user_trips(user_id):
    conn = get_db_connections()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM TripUserRecord WHERE user_id = {user_id}")
    return cursor.fetchall()

def get_all_users():
    conn = get_db_connections()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM User")
    return cursor.fetchall()

