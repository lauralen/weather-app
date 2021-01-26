import React from "react";
import style from "./WeatherCard.module.scss";

import Button from "./Button";
import Map from "./Map";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faTint,
  faWind,
  faCloud
} from "@fortawesome/free-solid-svg-icons";

const WeatherCard = ({ data, favorites, setFavorites }) => {
  const { name, sys, main, weather, wind, units, coord, clouds } = data;
  const { temp_max, temp_min, humidity } = main;
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
      <div className={style.main}>
        <div className={style.favoriteWrapper}>
          {isFavorite || favorites.length > 20 ? null : (
            <Button
              type="primary"
              onClick={() => {
                setFavorites([...favorites, { name, country }]);
              }}
            >
              <FontAwesomeIcon icon={faStar} />
            </Button>
          )}
        </div>

        <h2>
          {name}, {country}
        </h2>

        <div>
          <img
            className={style.icon}
            src={`https://openweathermap.org/img/w/${icon}.png`}
            alt="Weather icon"
          />
          <p className={style.description}>{description}</p>
          <h3>
            {Math.round(temp_max)}
            {unit.temperature} / {Math.round(temp_min)}
            {unit.temperature}
          </h3>
        </div>

        <ul className={style.list}>
          <li>
            <FontAwesomeIcon icon={faTint} />
            <span>Humidity</span>
            <span>{humidity}%</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faWind} />
            <span>Wind speed</span>
            <span>
              {Math.round(wind.speed)} {unit.speed}
            </span>
          </li>
          <li>
            <FontAwesomeIcon icon={faCloud} />
            <span>Cloudiness</span>
            <span>{clouds.all} %</span>
          </li>
        </ul>
      </div>

      <Map position={[lat, lon]} />
    </div>
  );
};

export default WeatherCard;
