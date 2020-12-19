import React from "react";
import Button from "./Button";
import style from "./WeatherCard.module.scss";

const WeatherCard = ({ data, favorites, favoriteCity }) => {
  const { name, sys, main, weather, wind, units } = data;
  const { temp, feels_like, humidity } = main;
  const { description, icon } = weather[0];

  const isFavorite = favorites.includes(name);

  const unit =
    units === "metric"
      ? { temperature: "°C", speed: "m/s" }
      : { temperature: "°F", speed: "mph" };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>
          {name}, {sys.country}
        </h2>
        {isFavorite ? null : (
          <Button
            type="secondary"
            onClick={() => {
              favoriteCity(name);
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
    </div>
  );
};

export default WeatherCard;
