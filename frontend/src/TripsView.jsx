import TopNavbar from "./TopNavbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";

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
      <h1 className="d-flex justify-content-center">All Trips</h1>
      <Container className="d-flex justify-content-center">
        {tripData ? (
          <>
            {tripData.data.map((trip, i) => {
              return (
                <Card
                  style={{ width: "18rem" }}
                  className="mb-2"
                  border="primary"
                  key={i}
                >
                  <Card.Body>
                    <Card.Title>Trip Name: {trip.trip_name}</Card.Title>
                    <Card.Text>Number of Attractions: {trip.attraction_num}</Card.Text>
                    <Button variant="primary" href={`/userTripMap/${trip.trip_id}`}>Detailed Map View</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </>
        ) : (
          <div class="loader d-flex justify-content-center"> </div>
        )}
      </Container>
    </div>
  );
}

export default TripsView;
