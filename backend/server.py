from flask import Flask, request
from Trip import Trip
import database_helper
from flask_cors import CORS

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
            "average_vote_score": a.get_average_vote()
        })
    return {
        "trip_id": t.id,
        "trip_name": t.name,
        "trip_start_date": t.start_date,
        "trip_end_date": t.end_date,
        "trip_created_date": t.created_date,
        "attractions": attraction_info
    }

@app.route("/addUserToTrip", methods=['POST'])
def addUserToTrip():
    userId = request.get_json()['userId']
    tripId = request.get_json()['tripId']
    if database_helper.add_user_to_trip(userId, tripId):
        return "", 200
    else:
        return "Error", 500

@app.route("/createTrip", methods=['POST'])
def createTrip():
    requestBody = request.get_json()
    userId = requestBody['userId']
    tripname = requestBody['tripName']
    startDate = requestBody['startDate']
    endDate = requestBody['endDate']
    if database_helper.createTrip(userId, tripname, startDate, endDate):
        return "", 200
    else:
        return "Error", 500

if __name__ == "__main__":
    app.run(debug=True)
