import { DragDropContext } from "react-beautiful-dnd";

function Itinerary(props) {
  const tripData = props.tripDetailedData;
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
      {tripData.itinerary.length ? (
        <h4>
          From {tripData.trip_start_date} to {tripData.trip_end_date}
        </h4>
      ) : (
        <div>
          <h4>Itinerary Missing</h4>
        </div>
      )}
    </div>
  );
}

export default Itinerary;
