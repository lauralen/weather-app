import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faCloud,
  faSnowflake,
  faSmog,
  faSun
} from "@fortawesome/free-solid-svg-icons";

const WeatherIcon = ({ id }) => {
  const code = id.charAt(0);
  let icon;

  switch (code) {
    case "2":
      icon = faBolt;
      break;
    case "3":
      icon = faCloudRain;
      break;
    case "5":
      icon = faCloudShowersHeavy;
      break;
    case "6":
      icon = faSnowflake;
      break;
    case "7":
      icon = faSmog;
      break;
    default:
      icon = faCloud;
  }

  if (id === "800") icon = faSun;

  return <FontAwesomeIcon icon={icon} />;
};

export default WeatherIcon;
