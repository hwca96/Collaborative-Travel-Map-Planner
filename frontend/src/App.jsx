import './App.css'
import SimpleMap from "./SimpleMap"
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import AllUsers from './AllUsers';
import TripsView from './TripsView';
import TODO from './TODO';
import TripMap from './TripMap';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/map' element={<SimpleMap />} />
      <Route path='/allUsers' element={<AllUsers />} />
      <Route path='/userTrips/:id/view' element= {< TripsView/>}/>
      <Route path='/userTripMap/:id' element={<TripMap/>} />
    </Routes>
  );
};

export default App