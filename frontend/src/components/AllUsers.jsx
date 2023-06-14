import { useState, useEffect } from "react";
import TopNavbar from "./TopNavbar";
import { Button, Card, Container } from "react-bootstrap";

function AllUsers() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/allUsers", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
    })
      .then((response) => response.json())
      .then((json) => setUserData(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <TopNavbar />
      <h1 className="d-flex justify-content-center">Users</h1>
      <Container className="d-flex justify-content-center">
        {userData ? (
          <>
            {userData.data.map((user, i) => {
              return (
                <Card
                  style={{ width: "18rem" }}
                  className="mb-2 mx-2"
                  border="primary"
                  key={i}
                >
                  <Card.Body>
                    <Card.Title>{user.user_name}</Card.Title>
                    <Card.Text>{user.user_email}</Card.Text>
                    <Button
                      variant="primary"
                      href={`/userTrips/${user.user_id}/view`}
                    >
                      Trips
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

export default AllUsers;
