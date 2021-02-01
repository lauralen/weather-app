import React from "react";
import style from "./WeatherCard.module.scss";

import WeatherIcon from "./WeatherIcon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTint, faWind, faCloud } from "@fortawesome/free-solid-svg-icons";

const WeatherCard = ({ data }) => {
  const { temp, humidity, clouds, weather, wind_speed, units } = data;
  const { description, id } = weather[0];

  const unit =
    units === "metric"
      ? { temperature: "°C", speed: "m/s" }
      : { temperature: "°F", speed: "mph" };

  return (
    <div className={style.container}>
      <h3 className={style.description}>{data?.dt}</h3>

      <div>
        <div className={style.icon}>
          <WeatherIcon id={String(id)} />
        </div>
        <p className={style.description}>{description}</p>
        <h3>
          {typeof temp === "number" ? (
            <>
              {Math.round(temp)} {unit.temperature}
            </>
          ) : (
            <>
              {Math.round(temp.max)}
              {unit.temperature} / {Math.round(temp.min)}
              {unit.temperature}
            </>
          )}
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
  );
};

export default WeatherCard;
