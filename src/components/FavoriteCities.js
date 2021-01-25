import React from "react";
import style from "./FavoriteCities.module.scss";

import Button from "./Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const FavoriteCities = ({ favorites, setFavorites, fetchData }) => {
  const sortObjects = (property, secondaryProperty) => {
    return function (firstObject, secondObject) {
      let firstProperty = firstObject[property];
      let secondProperty = secondObject[property];
      let result;

      if (firstProperty === secondProperty && secondaryProperty) {
        let firstProperty = firstObject[secondaryProperty];
        let secondProperty = secondObject[secondaryProperty];

        result = getSortResult(firstProperty, secondProperty);
      } else {
        result = getSortResult(firstProperty, secondProperty);
      }

      return result;
    };
  };

  const getSortResult = (firstProperty, secondProperty) => {
    return firstProperty < secondProperty
      ? -1
      : firstProperty > secondProperty
      ? 1
      : 0;
  };

  return (
    <>
      <div className={style.header}>
        <h1>Favorite cities</h1>

        {favorites?.length ? (
          <Button
            type="danger"
            onClick={() => {
              setFavorites([]);
            }}
          >
            Clear all
          </Button>
        ) : null}
      </div>

      <ul className={style.cities}>
        {favorites?.length ? (
          favorites
            .sort(sortObjects("country", "name", "ascending"))
            .map(city => {
              const { name, country } = city;

              return (
                <li key={city.name}>
                  <Button
                    type="primary"
                    onClick={() => {
                      fetchData(name);
                    }}
                  >
                    {name}, {country}
                  </Button>
                  <Button
                    type="danger"
                    onClick={() => {
                      setFavorites(favorites.filter(fav => fav.name !== name));
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </li>
              );
            })
        ) : (
          <p>No cities added to favorites</p>
        )}
      </ul>
    </>
  );
};

export default FavoriteCities;
