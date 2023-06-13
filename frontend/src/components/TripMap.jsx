import { useState, useRef, useEffect } from "react";
import Map from "./Map";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import TopNavbar from "./TopNavbar";
import { useParams } from "react-router-dom";

function TripMap() {
  const routeParams = useParams();
  const [tripDetailedData, setTripDetailedData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null)

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
              <Row>
                <div className="mx-auto text-center">
                <Button variant="outline-info mx-2">Add Attractions</Button>
                <Button variant="outline-danger mx-2" disabled={selectedIndex === null}>Remove Attraction</Button>
                </div>
              </Row>
              <div className="div-scroll">
                <ListGroup>
                  {tripDetailedData.attractions.map((attraction, i) => {
                    return (
                      <ListGroup.Item action key={i} onClick={() => {
                        setSelectedIndex(i)
                        console.log(i)
                      }}>
                          {attraction.name}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
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
