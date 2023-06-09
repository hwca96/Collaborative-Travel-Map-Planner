import database_helper


class Vote:
    """
    The detailed Vote class that belongs to an Attraction within a Trip
    """

    def __init__(self, vote_id, user_id):
        self.id = vote_id
        self.userId = user_id

        # Setting up connection and cursor
        conn = database_helper.get_db_connections()
        cursor = conn.cursor()

        # Getting user database row
        cursor.execute(f"SELECT * FROM VotingRecord WHERE voting_record_id = {vote_id}")
        vote_db_row = cursor.fetchone()

        # Assign attributes
        self.starValue = vote_db_row['star_value']

        # committing and closing connection
        conn.commit()
        conn.close()