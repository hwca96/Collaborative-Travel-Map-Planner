import database_helper
from Comment import Comment
from Vote import Vote


class Attraction:
    """
    The detailed attraction class that belongs to a Trip
    """

    def __init__(self, trip_attraction_id):
        self.id = trip_attraction_id
        self.comments = []
        self.votes = []

        # Setting up connection and cursor
        conn = database_helper.get_db_connections()
        cursor = conn.cursor()

        # Getting trip database row
        cursor.execute(f"SELECT * FROM Attraction INNER JOIN TripAttractionRecord ON Attraction.attraction_id = TripAttractionRecord.attraction_id WHERE TripAttractionRecord.trip_attraction_id = {trip_attraction_id}")
        attraction_db_rows = cursor.fetchone()

        # Getting comments of this attraction
        cursor.execute(f"SELECT * FROM CommentRecord WHERE trip_attraction_id = {trip_attraction_id}")
        attraction_comment_rows = cursor.fetchall()
        for r in attraction_comment_rows:
            self.comments.append(Comment(r['comment_id'], r['user_id']))

        # Getting votes of this attraction
        cursor.execute(f"SELECT * FROM VotingRecord WHERE trip_attraction_id = {trip_attraction_id}")
        attraction_vote_rows = cursor.fetchall()
        for r in attraction_vote_rows:
            self.votes.append(Vote(r['voting_record_id'], r['user_id']))

        # Assigning attributes
        self.name = attraction_db_rows["name"]
        self.type = attraction_db_rows["type"]
        self.lat = attraction_db_rows["lat"]
        self.lon = attraction_db_rows["lon"]
        self.address = attraction_db_rows["address"]
        self.description = attraction_db_rows["description"]
        self.creatorId = attraction_db_rows["user_created_id"]

        # committing and closing connection
        conn.commit()
        conn.close()

    def remove(self):
        # Setting up connection and cursor
        conn = database_helper.get_db_connections()
        cursor = conn.cursor()
        # Removing record from table
        try:
            cursor.execute(f"DELETE FROM TripAttractionRecord WHERE attraction_id = {self.id}")
            return True
        except:
            return False
        finally:
            # committing and closing connection
            conn.commit()
            conn.close()

    def add_comment(self, comment_text, user_id):
        # TODO
        print("TODO")

    def delete_comment(self, comment_id, user_id):
        # TODO
        print("TODO")

    def add_vote(self, vote_score, user_id):
        # TODO
        print("TODO")

    def delete_vote(self, vote_id, user_id):
        # TODO
        print("TODO")

    def get_average_vote(self):
        if (len(self.votes) > 0):
            sum = 0
            for v in self.votes:
                sum += v.starValue
            return int(sum/len(self.votes))
        else:
            return 0

