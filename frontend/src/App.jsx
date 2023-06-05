import './App.css'
import Map from "./Map"
import TopNavbar from './TopNavbar';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <TopNavbar />
      <Map />
    </div>
  );
};

export default App