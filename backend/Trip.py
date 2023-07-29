import database_helper
from Attraction import Attraction
from User import User
from datetime import datetime, timedelta


class Trip:
    """
    The detailed trip class
    """

    def __init__(self, trip_id):
        self.id = trip_id
        self.attractions = []
        self.users = []

        # Setting up connection and cursor
        conn = database_helper.get_db_connections()
        cursor = conn.cursor()

        # Getting trip database row
        cursor.execute(f"SELECT * FROM Trip WHERE trip_id = {trip_id}")
        trip_db_row = cursor.fetchone()

        # Getting user in this trip
        cursor.execute(f"SELECT * FROM TripUserRecord WHERE trip_id = {trip_id}")
        trip_user_rows = cursor.fetchall()
        for r in trip_user_rows:
            self.users.append(User(r["user_id"], r["role"]))

        # Getting attractions in this trip
        cursor.execute(f"SELECT * FROM TripAttractionRecord WHERE trip_id = {trip_id}")
        trip_attraction_rows = cursor.fetchall()
        for r in trip_attraction_rows:
            self.attractions.append(Attraction(r["trip_attraction_id"]))

        # Assigning attributes
        self.name = trip_db_row["trip_name"]
        self.start_date = trip_db_row["trip_start_date"]
        self.end_date = trip_db_row["trip_end_date"]
        self.created_date = trip_db_row["trip_created_date"]

        # Getting Itinerary
        # TODO
        self.itinerary = []
        if self.end_date and self.start_date:
            format = "%Y-%m-%d"
            startDate = datetime.strptime(self.start_date, format).date()
            endDate = datetime.strptime(self.end_date, format).date()
            diff = endDate.day - startDate.day
            print(diff)
            for i in range(diff + 1):
                self.itinerary.append(
                    {"date": (startDate + timedelta(days=i)).strftime(format),
                     "attractions": []}
                )
            # SAMPLE DATA TODO
            self.itinerary[0]["attractions"].extend([2, 3, 4])
            self.itinerary[1]["attractions"].extend([2, 3, 4])
            #____________________________________________________
            cursor.execute(f"SELECT * FROM TripItinerary WHERE trip_id = {trip_id}")
            trip_itinerary_rows = cursor.fetchall()
            for r in trip_itinerary_rows:
                for x in self.itinerary:
                    if r['scheduled_date'] == x['date']:
                        x['attractions'].append(r["trip_attraction_id"])

        # committing and closing connection
        conn.commit()
        conn.close()

    # Users might not need to live in Trip
    def add_user(self, user_id):
        # TODO
        print("TODO")

    def remove_user(self, user_id):
        # TODO
        print("TODO")

    # --------------------------------------------
    def is_owner(self, user_id):
        for u in self.users:
            if u.role == "Owner":
                return user_id == u.id

    # Attraction method
    def add_attraction(self, attraction, user_id):
        conn = database_helper.get_db_connections()
        cursor = conn.cursor()
        try:
            cursor.execute(
                f"INSERT INTO Attraction (name, type, lat, lon, address, description) VALUES (?, ?, ?, ?, ?, ?)",
                (
                    attraction["name"],
                    attraction["type"],
                    attraction["lat"],
                    attraction["lon"],
                    attraction["address"],
                    attraction["description"],
                ),
            )
            attractionId = cursor.lastrowid
            cursor.execute(
                "INSERT INTO TripAttractionRecord (attraction_id, trip_id, user_created_id, added_date) VALUES (?, ?, ?, ?)",
                (attractionId, self.id, user_id, datetime.now()),
            )
            return True
        except:
            return False
        finally:
            conn.commit()
            conn.close()

    def get_initial_coordinate_zoom(self):
        """
        Get the initial map zoom and coordinate based on the attractions inside this trip
        """
        # TODO
        print("TODO")
