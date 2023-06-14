import database_helper
from Attraction import Attraction
from User import User
from statistics import median


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

        # committing and closing connection
        conn.commit()
        conn.close()


    # Users might not need to live in Trip
    def add_user(self, user_id):
        self.users.append([user_id])

    def remove_user(self, user_id):
        self.users.remove([user_id])
    #--------------------------------------------

    # Attraction method
    def add_attraction(self, attraction_id, user_id):
        # TODO
        print("TODO")

    def remove_attraction(self, attraction_id, user_id):
        # TODO
        print("TODO")

    def get_initial_coordinate_zoom(self):
        """
        Get the initial map zoom and coordinate based on the attractions inside this trip

        return dictionaray of size 2
        """
        # TODO
    
        x_coords = []
        y_coords = []
        
        for attraction in self.attractions:
            x_coords.append([attraction.lon])
            y_coords.append([attraction.lat])
        x = median(x_coords)
        y = median(y_coords)
        x_min = min(x_coords)
        x_max = max(x_coords)
        y_min = min(y_coords)
        y_max = max(y_coords)
        zoom = max(x - x_min, x_max - x, y - y_min, y_max - y)

        return {"Center" : [x, y], "Zoom" : zoom}
