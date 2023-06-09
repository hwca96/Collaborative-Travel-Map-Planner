import { useState, useRef, useEffect } from "react";
import Map from "./Map";
import { Container } from "react-bootstrap";
import TopNavbar from "./TopNavbar";
import { useParams } from "react-router-dom";

function TripMap() {
  const routeParams = useParams();
  const [tripDetailedData, setTripDetailedData] = useState(null);

  // Initialize map when component mounts
  useEffect(() => {
    // fetch detailed trip data
      fetch(`http://localhost:5000/tripDetails?id=${routeParams.id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5000/",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setTripDetailedData(json)
        })
        .catch((error) => console.error(error))
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Container fluid>
      <TopNavbar />
      {tripDetailedData ? (
            <Map attractions={tripDetailedData.attractions}/>
        ) : (
          <div class="loader d-flex justify-content-center"> </div>
        )}
    </Container>
  );
}

export default TripMap;
