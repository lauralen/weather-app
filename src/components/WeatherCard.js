import React from "react";
import style from "./WeatherCard.module.scss";

import Button from "./Button";
import WeatherIcon from "./WeatherIcon";
import Map from "./Map";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faTint,
  faWind,
  faCloud
} from "@fortawesome/free-solid-svg-icons";

const WeatherCard = ({ data, favorites, setFavorites }) => {
  const {
    temp,
    humidity,
    clouds,
    weather,
    wind_speed,
    country,
    name,
    coord,
    units
  } = data;
  const { lat, lon } = coord;
  const { description, id } = weather[0];

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

        <h3 className={style.description}>Current weather</h3>
        <h2>
          {name}, {country}
        </h2>
        <div>
          <div className={style.icon}>
            <WeatherIcon id={String(id)} />
          </div>
          <p className={style.description}>{description}</p>
          <h3>
            {Math.round(temp)}
            {unit.temperature}
          </h3>
        </div>
        <ul className={style.list}>
          <li>
            <div className={style.listItemIcon}>
              <FontAwesomeIcon icon={faTint} />
            </div>
            <span className={style.listItemTitle}>Humidity</span>
            <span className={style.listItemValue}>{humidity}%</span>
          </li>

          <li>
            <div className={style.listItemIcon}>
              <FontAwesomeIcon icon={faWind} />
            </div>
            <span className={style.listItemTitle}>Wind speed</span>
            <span className={style.listItemValue}>
              {Math.round(wind_speed)} {unit.speed}
            </span>
          </li>

          <li>
            <div className={style.listItemIcon}>
              <FontAwesomeIcon icon={faCloud} />
            </div>
            <span className={style.listItemTitle}>Cloudiness</span>
            <span className={style.listItemValue}>{clouds} %</span>
          </li>
        </ul>
      </div>

      <Map position={[lat, lon]} />
    </div>
  );
};

export default WeatherCard;
