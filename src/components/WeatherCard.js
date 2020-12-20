import React from "react";
import Button from "./Button";
import Map from "./Map";
import style from "./WeatherCard.module.scss";

const WeatherCard = ({ data, favorites, setFavorites }) => {
  const { name, sys, main, weather, wind, units, coord } = data;
  const { temp, feels_like, humidity } = main;
  const { lon, lat } = coord;
  const { country } = sys;
  const { description, icon } = weather[0];

  const isFavorite = favorites.find(city => city.name === name);

  const unit =
    units === "metric"
      ? { temperature: "°C", speed: "m/s" }
      : { temperature: "°F", speed: "mph" };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>
          {name}, {country}
        </h2>
        {isFavorite || favorites.length > 20 ? null : (
          <Button
            type="primary"
            onClick={() => {
              setFavorites([...favorites, { name, country }]);
            }}
          >
            + Add to favorites
          </Button>
        )}
      </div>

      <img
        className={style.icon}
        src={`http://openweathermap.org/img/w/${icon}.png`}
        alt="Weather icon"
      />
      <p className={style.description}>{description}</p>

      <ul className={style.list}>
        <li>
          <span>Temperature</span>
          <span>
            {Math.round(temp)}
            {unit.temperature}
          </span>
        </li>
        <li>
          <span>Feels like</span>
          <span>
            {Math.round(feels_like)}
            {unit.temperature}
          </span>
        </li>
        <li>
          <span>Humidity</span>
          <span>{humidity}%</span>
        </li>
        <li>
          <span>Wind speed</span>
          <span>
            {Math.round(wind.speed)} {unit.speed}
          </span>
        </li>
      </ul>

      <Map position={[lat, lon]} />
    </div>
  );
};

export default WeatherCard;
