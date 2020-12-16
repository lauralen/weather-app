import React, { useState, useEffect } from "react";
import openWeatherKey from "./utils/openWeatherKey";

import WeatherCard from "./components/WeatherCard";
import Button from "./components/Button";

import style from "./App.module.scss";

function App() {
  const [location, setLocation] = useState("");
  const [units, setUnits] = useState("metric");
  const [favorites, setFavorites] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const favoriteCities = JSON.parse(localStorage.getItem("favoriteCities"));
    favoriteCities?.length && setFavorites(favoriteCities);
  }, []);

  useEffect(() => {
    data && fetchData();
  }, [units]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${openWeatherKey}`
    )
      .then(response => response.json())
      .then(response => {
        if (response.cod === 200) {
          setData(response);
        } else {
          handleError("Failed to load data");
        }
      })
      .catch(error => handleError(String(error)))
      .finally(() => setLoading(false));
  };

  const handleError = message => {
    setData(null);
    setError(message);
    console.error(message);
  };

  const changeUnits = event => {
    setUnits(event.target.value);
  };

  const favoriteCity = name => {
    const updatedList = [...favorites, name];

    localStorage.setItem("favoriteCities", JSON.stringify(updatedList));
    setFavorites(updatedList);
  };

  return (
    <>
      <header className={style.header}>
        <h1>Weather App</h1>

        <form
          onSubmit={event => {
            event.preventDefault();
            location.length && fetchData();
          }}
        >
          <input
            className={style.input}
            value={location}
            onChange={event => setLocation(event.target.value)}
            type="text"
            placeholder="Search"
          />

          <div className={style.radioButtons}>
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

          <Button type="primary">Search</Button>
        </form>
      </header>

      <main className={style.main}>
        <section className={style.section}>
          {loading ? (
            <div className={style.loader} />
          ) : error ? (
            <p className={style.error}>{error}</p>
          ) : data ? (
            <WeatherCard
              data={data}
              units={units}
              favoriteCity={favoriteCity}
            />
          ) : (
            <p>Search location to see weather data</p>
          )}
        </section>

        <section className={style.section}>
          <h2>Favorite cities</h2>
          <ul className={style.cities}>
            {favorites?.length ? (
              favorites.map(city => {
                return <li key={city}>{city}</li>;
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
