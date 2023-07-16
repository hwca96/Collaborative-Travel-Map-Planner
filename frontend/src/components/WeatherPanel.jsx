import { useMemo, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { median } from "mathjs";

function WeatherPanel(props) {
  const tripData = props.tripData;
  const tripStartDate = tripData.trip_start_date;
  const tripEndDate = tripData.trip_end_date;
  const weatherData = null;
  const getCenterCoordinate = (attractions) => {
    var lon = [];
    var lat = [];
    attractions.forEach((element) => {
      lon.push(element.coordinates[0]);
      lat.push(element.coordinates[1]);
    });
    return [median(lon), median(lat)];
  };
  const centerCoords = getCenterCoordinate(tripData.attractions);
  const getWeatherData = () => {
    fetch(
      `http://localhost:5000/weatherDetail?lon=${centerCoords[0]}&lat=${centerCoords[1]}&start=${tripStartDate}&end=${tripEndDate}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5000/",
        },
      }
    )
      .then((response) => response)
      .then((json) => {
        console.log(json);
        weatherData = ""
      })
      .catch((err) => console.log(err));
  };
  getWeatherData()
  return (
    <div>
      {centerCoords[0]}, {centerCoords[1]}
    </div>
  );
}

export default WeatherPanel;
