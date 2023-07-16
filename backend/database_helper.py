import sqlite3
from datetime import datetime


def get_db_connections():
    connection = sqlite3.connect("data/database.db")
    connection.row_factory = sqlite3.Row
    return connection


def get_user_trips(user_id):
    conn = get_db_connections()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM TripUserRecord WHERE user_id = {user_id}")
    data = cursor.fetchall()
    # committing and closing connection
    conn.commit()
    conn.close()
    return data


def get_all_users():
    conn = get_db_connections()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM User")
    data = cursor.fetchall()
    # committing and closing connection
    conn.commit()
    conn.close()
    return data


def add_user_to_trip(userId, tripId, role="User"):
    conn = get_db_connections()
    cursor = conn.cursor()
    # added unique constraint so duplication shouldn't need to be checked
    try:
        cursor.execute(
            "INSERT INTO TripUserRecord (trip_id, user_id, role) VALUES (?, ?, ?)",
            (tripId, userId, role),
        )
        return True
    except:
        return False
    finally:
        # committing and closing connection
        conn.commit()
        conn.close()


def createTrip(userId, tripName, tripStartStr, tripEndStr):
    conn = get_db_connections()
    cursor = conn.cursor()
    try:
        format = "%Y-%m-%d"
        startDate, endDate = None, None
        if tripStartStr:
            startDate = datetime.strptime(tripStartStr, format).date()
        if tripEndStr:
            endDate = datetime.strptime(tripEndStr, format).date()
        cursor.execute(
            "INSERT INTO Trip (trip_name, trip_created_date, trip_start_date, trip_end_date) VALUES (?, ?, ?, ?)",
            (tripName, datetime.now(), startDate, endDate),
        )
        tripId = cursor.lastrowid
        cursor.execute(
            "INSERT INTO TripUserRecord (trip_id, user_id, role) VALUES (?, ?, ?)",
            (tripId, userId, "Owner"),
        )
        return True
    except:
        return False
    finally:
        # committing and closing connection
        conn.commit()
        conn.close()


def updateTripDetails(tripId, tripName, tripStartStr, tripEndStr):
    conn = get_db_connections()
    cursor = conn.cursor()
    try:
        format = "%Y-%m-%d"
        startDate, endDate = None, None
        if tripStartStr:
            startDate = datetime.strptime(tripStartStr, format).date()
        if tripEndStr:
            endDate = datetime.strptime(tripEndStr, format).date()
        cursor.execute(
            "UPDATE Trip  SET trip_name = ?, trip_start_date = ?, trip_end_date = ? WHERE trip_id = ?",
            (tripName, startDate, endDate, tripId)
        )
        return True
    except:
        return False
    finally:
        # committing and closing connection
        conn.commit()
        conn.close()

def removeAttraction(tripAttractionId, userId):
    # TODO userId not used right now, need to check for owner status
    # Setting up connection and cursor
        conn = get_db_connections()
        cursor = conn.cursor()
        # Removing record from table
        try:
            cursor.execute("DELETE FROM TripAttractionRecord WHERE trip_attraction_id = ?", [tripAttractionId])
            return True
        except:
            return False
        finally:
            # committing and closing connection
            conn.commit()
            conn.close()