import React from "react";
import style from "./WeatherCard.module.scss";

const WeatherCard = ({ data }) => {
  console.log(data);
  const degreeSymbol = "°C";

  const { name, sys, main, weather, wind } = data;
  const { temp, feels_like, humidity } = main;
  const { description, icon } = weather[0];

  return (
    <section className={style.section}>
      <h2>
        {name}, {sys.country}
      </h2>
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
            {temp}
            {degreeSymbol}
          </span>
        </li>
        <li>
          <span>Feels like</span>
          <span>
            {feels_like}
            {degreeSymbol}
          </span>
        </li>
        <li>
          <span>Humidity</span>
          <span>{humidity}%</span>
        </li>
        <li>
          <span>Wind speed</span>
          <span>{wind.speed} m/s</span>
        </li>
      </ul>
    </section>
  );
};

export default WeatherCard;
