import TopNavbar from "./TopNavbar";
import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";

// TODO Add validation check on dates, end date >= start date
function CreateTrip() {
  const [tripName, setTripName] = useState(null);
  const [tripStartDate, setTripStartDate] = useState(null);
  const [tripEndDate, setTripEndDate] = useState(null);
  const routeParams = useParams();

  const onFormSubmit = (event) => {
    console.log(tripName, tripStartDate, tripEndDate)
    event.preventDefault();
    const data = {
        "userId": routeParams.userId,
        "tripName": tripName,
        "startDate": tripStartDate,
        "endDate": tripEndDate
    }
    fetch("http://localhost:5000/createTrip", {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:5000/",
            'Content-type':'application/json'
          },
          body: JSON.stringify(data)
    }).then((response) => {
        if (response.status === 200) {
            alert(`Successfully Created Trip: ${tripName}`)
            window.location.href = `/userTrips/${routeParams.userId}/view`
        } else {
            alert("Something went wrong")
        }
    })
    .catch((error) => console.error(error));
    // alert(tripIdToJoin);
  };

  return (
    <div>
      <TopNavbar />
      <Card style={{ width: "18rem" }} className="mx-auto text-center">
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mx-5 text-center" controlId="formTripId">
            <Form.Label>Trip Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Required"
              onChange={(event) => {
                setTripName(event.target.value);
              }}
              required={true}
            />
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(event) => {
                setTripStartDate(event.target.value);
              }}
            />
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(event) => {
                setTripEndDate(event.target.value);
              }}
            />
          </Form.Group>
          <div className="mx-5 my-3 text-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default CreateTrip;
