import { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Container } from "react-bootstrap";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFydmV5dWJjIiwiYSI6ImNsaWRyenBieTB1dzgza3BmN2h3OTBmbW0ifQ.adlzsHRQg4Y4X0XJ8zLsCg";

function Map(props) {
  const attractions = props.attractions;
  var selectedId = props.selectedId;
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

    attractions.map((a) => {
      const popup = new mapboxgl.Popup().setHTML(`
      <div class="card">
      <div class="card-header">
        Voting Average: ${a.average_vote_score}
      </div>
      <div class="card-body">
        <h5 class="card-title" style="font-weight: bold">${a.name}</h5>
        <p class="card-text">${a.address}</p>
        <a href="#" class="btn btn-primary">Details</a>
       </div>
      </div>
      `);
      new mapboxgl.Marker().setLngLat(a.coordinates).setPopup(popup).addTo(map);
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add geocoding control
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true
      })
    geocoder.on("result", (r) => {
      console.log(geocoder.mapMarker)
      geocoder.mapMarker.setPopup(new mapboxgl.Popup().setHTML('<h1>Testing</h1>'))
      geocoder.mapMarker.togglePopup()
    })
    map.addControl(
      geocoder, "top-left"
    )

    map.on("move", () => {
      setLng(map.getCenter().lng);
      setLat(map.getCenter().lat);
      setZoom(map.getZoom());
    });

    map.on("load", function () {
      map.resize();
    });

    if (selectedId !== null) {
      map.flyTo({
        center: attractions[selectedId].coordinates,
        essential: true,
        zoom: 15,
      });
      map._markers[selectedId].togglePopup();
    }

    // Clean up on unmount
    return () => map.remove();
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

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