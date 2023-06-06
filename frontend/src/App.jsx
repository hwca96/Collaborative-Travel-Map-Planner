import './App.css'
import Map from "./Map"
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/map' element={<Map />} />
    </Routes>
  );
};

export default App