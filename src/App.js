import React, { useState } from "react";
import openWeatherKey from "./utils/openWeatherKey";
import style from "./App.module.scss";

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${openWeatherKey}`
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
        </form>
      </header>
      <main className={style.main}>
        {loading ? (
          <div className={style.loader} />
        ) : error ? (
          <p className={style.error}>{error}</p>
        ) : data ? (
          JSON.stringify(data)
        ) : (
          <p>Search location to see weather data</p>
        )}
      </main>
    </>
  );
}

export default App;
