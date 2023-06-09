import { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Container } from "react-bootstrap";
import TopNavbar from "./TopNavbar";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFydmV5dWJjIiwiYSI6ImNsaWRyenBieTB1dzgza3BmN2h3OTBmbW0ifQ.adlzsHRQg4Y4X0XJ8zLsCg";

function Map(props) {
  const attractions = props.attractions;
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(-122.41);
  const [lat, setLat] = useState(49.53);
  const [zoom, setZoom] = useState(8.85);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    attractions.map((a) =>
      new mapboxgl.Marker().setLngLat(a.coordinates).addTo(map)
    );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng);
      setLat(map.getCenter().lat);
      setZoom(map.getZoom());
    });

    map.on("load", function () {
      map.resize();
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container fluid>
      <div>
        Longitude: {lng.toFixed(2)} | Latitude: {lat.toFixed(2)} | Zoom:{" "}
        {zoom.toFixed(2)}
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </Container>
  );
}

export default Map;
