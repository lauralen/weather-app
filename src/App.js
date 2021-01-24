import React, { useState, useEffect } from "react";
import openWeatherKey from "./utils/openWeatherKey";

import Header from "./layout/Header";
import SideMenu from "./layout/SideMenu";

import WeatherCard from "./components/WeatherCard";
import Button from "./components/Button";
import Tooltip from "./components/Tooltip";
import TemperatureUnitSelect from "./components/TemperatureUnitSelect";
import Section from "./components/Section";

import style from "./App.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCog, faTimes } from "@fortawesome/free-solid-svg-icons";
import FavoriteCities from "./components/FavoriteCities";

function App() {
  const [location, setLocation] = useState("");
  const [units, setUnits] = useState("metric");
  const [favorites, setFavorites] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationErrors, setLocationErrors] = useState([]);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

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
        </form>

        <Button
          type="primary"
          onClick={() => {
            setSideMenuOpen(!sideMenuOpen);
          }}
        >
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
      </main>

      <SideMenu
        isOpen={sideMenuOpen}
        close={() => {
          setSideMenuOpen(false);
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            setSideMenuOpen(false);
          }}
        >
          <FontAwesomeIcon icon={faTimes} color="white" />
        </Button>

        <Section>
          <TemperatureUnitSelect units={units} changeUnits={changeUnits} />
        </Section>

        <Section>
          <FavoriteCities
            favorites={favorites}
            setFavorites={setFavorites}
            fetchData={fetchData}
          />
        </Section>
      </SideMenu>
    </>
  );
}

export default App;
