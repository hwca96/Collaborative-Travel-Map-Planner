import "./App.css";
import SimpleMap from "./components/SimpleMap";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import AllUsers from "./components/AllUsers";
import TripsView from "./components/TripsView";
import TODO from "./components/TODO";
import TripMap from "./components/TripMap";
import JoinTrip from "./components/JoinTrip";
import CreateTrip from "./components/CreateTrip";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<SimpleMap />} />
      <Route path="/allUsers" element={<AllUsers />} />
      <Route path="/userTrips/:userId/view" element={<TripsView />} />
      <Route path="/userTripMap/:userId/:tripAttractionId" element={<TripMap />} />
      <Route path="/joinTrip/:userId" element={<JoinTrip />} />
      <Route path="/createTrip/:userId" element={<CreateTrip />} />
    </Routes>
  );
}

export default App;
