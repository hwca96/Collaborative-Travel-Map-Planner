import { DragDropContext } from "react-beautiful-dnd";
import { Container, Card } from "react-bootstrap";

function Itinerary(props) {
  const tripData = props.tripDetailedData;
  console.log(tripData);
  return (
    <div>
      {tripData.trip_start_date && tripData.trip_end_date ? (
        <h4>
          From {tripData.trip_start_date} to {tripData.trip_end_date}
        </h4>
      ) : (
        <div>
          <h4>Trip dates not set</h4>
        </div>
      )}
      {~tripData.itinerary.length ? (
        <div>
          <Container>
            {tripData.attractions.map((attraction, i) => {
              return <Card key={i}>{attraction.name}</Card>;
            })}
            {
              tripData.itinerary.map((day, i) => {
                return <Card key={i}>{day.date}</Card>;
              })
            }
          </Container>
        </div>
      ) : (
        <div>
          <h4>Itinerary Missing</h4>
        </div>
      )}
    </div>
  );
}

export default Itinerary;
