import React from "react";
import { MapContainer, TileLayer, Marker, LayersControl } from "react-leaflet";
import openWeatherKey from "../utils/openWeatherKey";
import style from "./Map.module.scss";

function Map({ position }) {
  const layers = [
    { value: "clouds", name: "Clouds" },
    { value: "precipitation", name: "Precipitation" },
    { value: "pressure", name: "Sea level pressure" },
    { value: "wind", name: "Wind speed" },
    { value: "temp", name: "Temperature" }
  ];

  return (
    <div className={style.mapWrapper}>
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl>
          {layers.map(option => {
            const { value, name } = option;
            return (
              <LayersControl.BaseLayer key={value} name={name}>
                <TileLayer
                  attribution='Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
                  url={`https://{s}.tile.openweathermap.org/map/${value}_new/{z}/{x}/{y}.png?appid=${openWeatherKey}`}
                />
              </LayersControl.BaseLayer>
            );
          })}
        </LayersControl>
        <Marker position={position} />
      </MapContainer>
    </div>
  );
}

export default Map;
