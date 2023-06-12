import TopNavbar from "./TopNavbar";
import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";

function JoinTrip() {
  const [tripIdToJoin, setTripIdToJoin] = useState(null);
  const routeParams = useParams();

  const onFormSubmit = (event) => {
    event.preventDefault();
    const data = {
        "userId": routeParams.userId,
        "tripId": tripIdToJoin
    }
    fetch("http://localhost:5000/addUserToTrip", {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:5000/",
            'Content-type':'application/json'
          },
          body: JSON.stringify(data)
    }).then((response) => {
        if (response.status === 200) {
            alert("Successfully Added User to Trip")
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
            <Form.Label>Trip ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Trip ID to Join"
              onChange={(event) => {
                setTripIdToJoin(event.target.value);
              }}
              required={true}
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

export default JoinTrip;
