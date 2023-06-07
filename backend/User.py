import database_helper


class User:
    """
    The detailed User class that belongs to a Trip
    """

    def __init__(self, user_id, user_role):
        self.id = user_id
        self.role = user_role

        # Setting up connection and cursor
        conn = database_helper.get_db_connections()
        cursor = conn.cursor()

        # Getting user database row
        cursor.execute(f"SELECT * FROM User WHERE user_id = {user_id}")
        user_db_row = cursor.fetchone()

        # Assign attributes
        self.name = user_db_row['name']
        self.email = user_db_row['email']

        # committing and closing connection
        conn.commit()
        conn.close()