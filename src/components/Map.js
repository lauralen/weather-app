import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import style from "./Map.module.scss";

function Map({ data }) {
  const { lon, lat } = data.coord;
  const position = [lat, lon];

  return (
    <div className={style.mapWrapper}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "50vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} />
      </MapContainer>
    </div>
  );
}

export default Map;
