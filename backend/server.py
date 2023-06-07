from flask import Flask, request, json
from Trip import Trip

app = Flask(__name__)

@app.route("/trip")
def attractions():
    tripId = request.args['id']
    t = Trip(int(tripId))
    return {
        "trip_id": t.id,
        "trip_name": t.name
    }
if __name__ == "__main__":
    app.run(debug=True)
