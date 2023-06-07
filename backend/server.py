from flask import Flask
import database_helper

app = Flask(__name__)

@app.route("/attractions")
def attractions():
    conn = database_helper.get_db_connections()
    attractions = conn.execute("SELECT * FROM Attraction")
    attractions_json = {"attractions": []}
    for a in attractions:
        attractions_json["attractions"].append(a["name"])
    conn.commit()
    conn.close()
    return attractions_json


if __name__ == "__main__":
    app.run(debug=True)
