import database_helper


class Comment:
    """
    The detailed Comment class that belongs to an Attraction within a Trip
    """

    def __init__(self, comment_id, user_id):
        self.id = comment_id
        self.userId = user_id

        # Setting up connection and cursor
        conn = database_helper.get_db_connections()
        cursor = conn.cursor()

        # Getting user database row
        cursor.execute(f"SELECT * FROM CommentRecord WHERE comment_id = {comment_id}")
        comment_db_row = cursor.fetchone()

        # Assign attributes
        self.text = comment_db_row['comment_text']

        # committing and closing connection
        conn.commit()
        conn.close()