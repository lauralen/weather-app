import React, { useState, useEffect } from "react";
import openWeatherKey from "./utils/openWeatherKey";

import Header from "./layout/Header";

import WeatherCard from "./components/WeatherCard";
import Button from "./components/Button";
import Tooltip from "./components/Tooltip";

import style from "./App.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCog } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [location, setLocation] = useState("");
  const [units, setUnits] = useState("metric");
  const [favorites, setFavorites] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationErrors, setLocationErrors] = useState([]);

  useEffect(() => {
    const favoriteCities = JSON.parse(localStorage.getItem("favoriteCities"));
    favoriteCities?.length && setFavorites(favoriteCities);

    navigator.geolocation.getCurrentPosition(location => {
      const { latitude, longitude } = location.coords;
      fetchData({ latitude: latitude, longitude });
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteCities", JSON.stringify(favorites));
  }, [favorites]);

  const fetchData = async location => {
    setLoading(true);
    setError(null);

    const locationQuery =
      typeof location === "string"
        ? `q=${location}`
        : `lat=${location.latitude}&lon=${location.longitude}`;

    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${locationQuery}&units=${units}&appid=${openWeatherKey}`
      );

      response = await response.json();

      if (response.cod === 200) {
        setData({ ...response, units });
        setLocation("");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleError = message => {
    setData(null);
    setError(message);
    console.error(message);
  };

  const changeUnits = event => {
    setUnits(event.target.value);
  };
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

  const validateLocation = value => {
    let errors = [];

    if (value.length > 20) {
      errors.push("Maximum 20 symbols");
    }

    if (value.length && !value.match(/^[a-zA-Z]+$/)) {
      errors.push("Only letters allowed");
    }

    setLocationErrors(errors);
  };

  return (
    <>
      <Header>
        <form
          className={style.form}
          onSubmit={event => {
            event.preventDefault();
            location.length && !locationErrors.length && fetchData(location);
          }}
        >
          <FontAwesomeIcon icon={faSearch} className={style.searchIcon} />
          <input
            className={`${style.input} ${
              locationErrors.length ? style.invalid : null
            }`}
            value={location}
            onChange={event => {
              const { value } = event.target;

              validateLocation(value);
              setLocation(value);
            }}
            type="text"
            placeholder="Enter city"
            required
          />

          {locationErrors.length ? (
            <Tooltip type="error">
              {locationErrors.map(error => {
                return <div key={error}>{error}</div>;
              })}
            </Tooltip>
          ) : null}

          {/* <div className={style.radioButtons}>
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

          <Button
            type="primary"
            disabled={!location.length || locationErrors.length}
          >
            Search
          </Button> */}
        </form>

        <Button type="primary">
          <FontAwesomeIcon icon={faCog} />
        </Button>
      </Header>

      <main className={style.main}>
        <section className={style.section}>
          {loading ? (
            <div className={style.loader} />
          ) : error ? (
            <p className={style.error}>{error}</p>
          ) : data ? (
            <WeatherCard
              data={data}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ) : (
            <p>Search location to see weather data</p>
          )}
        </section>

        <section className={style.section}>
          <div className={style.sectionHeader}>
            <h2>Favorite cities</h2>
            {favorites?.length ? (
              <Button
                type="primary"
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
                          setFavorites(
                            favorites.filter(fav => fav.name !== name)
                          );
                        }}
                      >
                        x
                      </Button>
                    </li>
                  );
                })
            ) : (
              <p>No cities added to favorites</p>
            )}
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;
