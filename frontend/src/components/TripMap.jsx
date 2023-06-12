import { useState, useRef, useEffect } from "react";
import Map from "./Map";
import { Container, Row, Col, Card } from "react-bootstrap";
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
        setTripDetailedData(json);
      })
      .catch((error) => console.error(error));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Container fluid>
      <TopNavbar />
      {tripDetailedData ? (
        <Container fluid>
          <Row>
            <Col md={3}>
              <div className="div-scroll">
              {tripDetailedData.attractions.map((attraction, i) => {
              return (
                <Card
                  style={{ width: "18rem" }}
                  className="mx-auto text-center mb-2"
                  border="primary"
                  key={i}
                >
                  <Card.Body className="mx-auto text-center">
                    {attraction.name}
                  </Card.Body>
                </Card>
              );
            })}
              </div>
            </Col>
            <Col md={9}>
              <Map attractions={tripDetailedData.attractions} />
            </Col>
          </Row>
        </Container>
      ) : (
        <div className="loader d-flex justify-content-center"> </div>
      )}
    </Container>
  );
}

export default TripMap;
