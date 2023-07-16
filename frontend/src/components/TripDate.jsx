import {
  Row,
  Col,
  Container,
  Button,
  Modal,
  Form,
  Offcanvas,
} from "react-bootstrap";
import { useState } from "react";
import WeatherPanel from "./WeatherPanel";

function TripDate(props) {
  const tripData = props.tripDetailedData;
  const [tripName, setTripName] = useState(tripData.trip_name);
  const [tripStartDate, setTripStartDate] = useState(tripData.trip_start_date);
  const [tripEndDate, setTripEndDate] = useState(tripData.trip_end_date);
  const [editDateShow, setEditDateshoe] = useState(false);
  const [weatherShow, setWeatherShow] = useState(false);
  const handleDateClose = () => setEditDateshoe(false);
  const handleDateShow = () => setEditDateshoe(true);
  const handleWeatherClose = () => setWeatherShow(false);
  const handleWeatherShow = () => setWeatherShow(true);
  const onFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      tripId: tripData.trip_id,
      tripName: tripName,
      startDate: tripStartDate,
      endDate: tripEndDate,
    };
    fetch("http://localhost:5000/createTrip", {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5000/",
        "Access-Control-Allow-Methods": "PUT",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Successfully Updated Trip Details");
          window.location.reload(false);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => console.error(error));
    // alert(tripIdToJoin);
    handleDateClose();
  };
  return (
    <Container fluid>
      <Row>
        <Col md="auto">
          <h4 className="text-left">{tripData.trip_name}</h4>
        </Col>
        <Col md="auto">
          {tripData.trip_start_date && tripData.trip_end_date ? (
            <h4>
              From {tripData.trip_start_date} to {tripData.trip_end_date}
            </h4>
          ) : (
            <div>
              <h4>Trip dates not set</h4>
            </div>
          )}
        </Col>
        <Col>
          <Button className="mx-1" onClick={handleDateShow}>
            Edit Trip Details
          </Button>
          <Button className="mx-1" onClick={handleWeatherShow}>
            Weather
          </Button>
          <Button className="mx-1">
            Iteneiary
          </Button>

          <Offcanvas show={weatherShow} onHide={handleWeatherClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Trip Weather</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <WeatherPanel tripData={tripData} />
            </Offcanvas.Body>
          </Offcanvas>

          <Modal show={editDateShow} onHide={handleDateClose}>
            <Modal.Header closeButton>
              <Modal.Title>Setting Trip Details</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onFormSubmit}>
              <Modal.Body>
                <Form.Group className="mx-5 text-center" controlId="formTripId">
                  <Form.Label>Trip Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={tripName}
                    onChange={(event) => {
                      setTripName(event.target.value);
                    }}
                  />
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={tripStartDate ? tripStartDate : ""}
                    onChange={(event) => {
                      setTripStartDate(event.target.value);
                    }}
                  />
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={tripEndDate ? tripEndDate : ""}
                    onChange={(event) => {
                      setTripEndDate(event.target.value);
                    }}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleDateClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default TripDate;
