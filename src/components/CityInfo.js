import React from "react";
import style from "./CityInfo.module.scss";

import Button from "./Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const CityInfo = ({ data, favorites, setFavorites }) => {
  const { country, name } = data;
  const isFavorite = favorites.find(city => city.name === name);

  return (
    <div className={style.container}>
      <h1 className={style.title}>
        Weather in
        <b>
          {" "}
          {name}, {country}
        </b>
      </h1>

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
  );
};

export default CityInfo;
