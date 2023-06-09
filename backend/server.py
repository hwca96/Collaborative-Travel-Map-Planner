from flask import Flask, request, json
from Trip import Trip
import database_helper
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/allUsers")
def allUsers():
    users = {"data": []}
    for r in database_helper.get_all_users():
        users['data'].append({
            "user_id": r["user_id"],
            "user_name": r['name'],
            "user_email": r['email']
        })
    return users

@app.route("/userTrips")
def userTrips():
    user_id = request.args['userId']
    trips = {'data': []}
    for r in database_helper.get_user_trips(user_id):
        trip = Trip(r['trip_id'])
        trips['data'].append({
            "trip_id": trip.id,
            "trip_name": trip.name,
            "attraction_num": len(trip.attractions),
            "num_users": len(trip.users)
        })
    return trips

@app.route("/tripDetails")
def attractions():
    tripId = request.args['id']
    t = Trip(int(tripId))
    attraction_info = []
    for a in t.attractions:
        attraction_info.append({
            "attraction_id": a.id,
            "coordinates": [a.lon, a.lat],
            "name": a.name,
            "type": a.type,
            "address": a.address,
            "description": a.description,
            "num_comments": len(a.comments),
            "average_vote_score": 5 #TODO
        })
    return {
        "trip_id": t.id,
        "trip_name": t.name,
        "trip_start_date": t.start_date,
        "trip_end_date": t.end_date,
        "trip_created_date": t.created_date,
        "attractions": attraction_info
    }
if __name__ == "__main__":
    app.run(debug=True)
