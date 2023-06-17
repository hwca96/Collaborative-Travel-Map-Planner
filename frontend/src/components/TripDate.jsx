import { Row, Col, Container, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";

function TripDate(props) {
  const tripData = props.tripDetailedData;
  const [tripName, setTripName] = useState(tripData.trip_name);
  const [tripStartDate, setTripStartDate] = useState(tripData.trip_start_date);
  const [tripEndDate, setTripEndDate] = useState(tripData.trip_end_date);
  const [editDateShow, setEditDateshoe] = useState(false);
  const handleClose = () => setEditDateshoe(false);
  const handleShow = () => setEditDateshoe(true);
  const onFormSubmit = (e) => {
    e.preventDefault()
    const data = {
        "tripId": tripData.trip_id,
        "tripName": tripName,
        "startDate": tripStartDate,
        "endDate": tripEndDate
    }
    fetch("http://localhost:5000/createTrip", {
        method: "PUT",
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:5000/",
            "Access-Control-Allow-Methods": "PUT",
            'Content-type':'application/json'
          },
          body: JSON.stringify(data)
    }).then((response) => {
        if (response.status === 200) {
            alert("Successfully Updated Trip Details")
            window.location.reload(false)
        } else {
            alert("Something went wrong")
        }
    })
    .catch((error) => console.error(error));
    // alert(tripIdToJoin);
    handleClose();
  };
  return (
    <Container>
      <Row>
        <Col md="auto">
          <h4>{tripData.trip_name}</h4>
        </Col>
        <Col md='auto'>
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
          <Button className="mx-1" onClick={handleShow}>
            Edit Trip Details
          </Button>
          <Button className="mx-1">Weather</Button>
          <Modal show={editDateShow} onHide={handleClose}>
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
                    value={tripStartDate? (tripStartDate) : ("")}
                    onChange={(event) => {
                      setTripStartDate(event.target.value);
                    }}
                  />
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={tripEndDate? (tripEndDate) : ("")}
                    onChange={(event) => {
                      setTripEndDate(event.target.value);
                    }}
                  />
                </Form.Group>
                {/* <div className="mx-5 my-3 text-center">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
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
