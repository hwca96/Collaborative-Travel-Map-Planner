import TopNavbar from "./TopNavbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Card, Container} from "react-bootstrap";

function TripsView() {
  const routeParams = useParams();
  const [tripData, setTripData] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/userTrips?userId=${routeParams.id}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
    })
      .then((response) => response.json())
      .then((json) => setTripData(json))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <TopNavbar />
      <h1 className="mx-auto text-center">All Trips</h1>
      <div className="mx-auto p-3 text-center">
        <Button variant="primary" className="mx-2" href={`/joinTrip/${routeParams.id}`}>
          Join a Trip
        </Button>
        <Button variant="primary" className="mx-2" href={`/createTrip/${routeParams.id}`}>
          Create Trip
        </Button>
      </div>

      <Container className="d-flex justify-content-center">
        {tripData ? (
          <>
            {tripData.data.map((trip, i) => {
              return (
                <Card
                  style={{ width: "18rem" }}
                  className="mb-2 mx-1"
                  border="primary"
                  key={i}
                >
                  <Card.Body>
                    <Card.Title>{trip.trip_name}</Card.Title>
                    <Card.Text>
                      Number of Attractions: {trip.attraction_num}
                    </Card.Text>
                    <Button
                      variant="primary"
                      href={`/userTripMap/${trip.trip_id}`}
                    >
                      Detailed Map View
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </>
        ) : (
          <div className="loader d-flex justify-content-center"> </div>
        )}
      </Container>
    </div>
  );
}

export default TripsView;
