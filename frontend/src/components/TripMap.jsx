import { useState, useRef, useEffect } from "react";
import Map from "./Map";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import TopNavbar from "./TopNavbar";
import { useParams } from "react-router-dom";
import AttractionCollapse from "./AttractionCollapse";
import { Accordion } from "react-bootstrap";
import TripDate from "./TripDate";

function TripMap() {
  const routeParams = useParams();
  const [tripDetailedData, setTripDetailedData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Initialize map when component mounts
  useEffect(() => {
    // fetch detailed trip data
    fetch(
      `http://localhost:5000/tripDetails?id=${routeParams.tripAttractionId}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5000/",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setTripDetailedData(json);
      })
      .catch((error) => console.error(error));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleDelete(attraction, tripId) {
    // TODO
    const data = {
      tripAttractionId: attraction.attraction_id,
      userId: routeParams.userId,
      tripId: tripId
    };
    fetch(`http://localhost:5000/deleteAttraction`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5000/",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        alert(`Successfully Deleted ${attraction.name}`);
        window.location.reload(false);
      } else {
        alert("Something went wrong");
      }
    });
    console.log("Deleted");
  }
  return (
    <Container fluid>
      <TopNavbar />
      {tripDetailedData ? (
        <Container fluid>
          <Row>
            <Col md={3}>
              <Row>
                <Row>
                  <h3>Added Attraction</h3>
                </Row>
              </Row>
              <div className="div-scroll">
                <Accordion flush>
                  {tripDetailedData.attractions.map((attraction, i) => {
                    return (
                      <Accordion.Item
                        key={i}
                        eventKey={i}
                        onClick={() => {
                          console.log(tripDetailedData)
                          setSelectedIndex(i);
                        }}
                      >
                        <Accordion.Header>
                          <h5>{attraction.name}</h5>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div>{attraction.address}</div>
                          <Button className="mx-1">Details</Button>
                          <Button
                            className="mx-1"
                            variant="danger"
                            onClick={() => {
                              handleDelete(attraction, tripDetailedData.trip_id);
                            }}
                          >
                            Delete
                          </Button>
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })}
                </Accordion>
              </div>
            </Col>
            <Col md={9}>
              <Row>
                <TripDate tripDetailedData={tripDetailedData}></TripDate>
              </Row>
              <Row>
              <Map
                attractions={tripDetailedData.attractions}
                selectedId={selectedIndex}
                userId={routeParams.userId}
                tripId={tripDetailedData.trip_id}
              />
              </Row>
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
