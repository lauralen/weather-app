import React from "react";
import style from "./TemperatureUnitSelect.module.scss";

const TemperatureUnitSelect = ({ units, changeUnits }) => {
  return (
    <div className={style.radioButtons} role="radiogroup">
      <p>Temperature units:</p>
      <div className={style.radioButtonWrapper}>
        <input
          id="metric"
          value="metric"
          name="units"
          type="radio"
          checked={units === "metric"}
          onChange={event => {
            changeUnits(event);
          }}
        />
        <label htmlFor="metric">Celcius</label>
      </div>

      <div className={style.radioButtonWrapper}>
        <input
          id="imperial"
          value="imperial"
          name="units"
          type="radio"
          checked={units === "imperial"}
          onChange={event => {
            changeUnits(event);
          }}
        />
        <label htmlFor="imperial">Fahrenheit</label>
      </div>
    </div>
  );
};

export default TemperatureUnitSelect;
