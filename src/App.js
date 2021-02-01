import React, { useState, useEffect } from "react";
import openWeatherKey from "./utils/openWeatherKey";

import Header from "./layout/Header";
import SideMenu from "./layout/SideMenu";

import CityInfo from "./components/CityInfo";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import Map from "./components/Map";
import Button from "./components/Button";
import Tooltip from "./components/Tooltip";
import TemperatureUnitSelect from "./components/TemperatureUnitSelect";
import Section from "./components/Section";
import FavoriteCities from "./components/FavoriteCities";

import style from "./App.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCog, faTimes } from "@fortawesome/free-solid-svg-icons";

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

    const temperatureUnits = JSON.parse(
      localStorage.getItem("temperatureUnits")
    );

    navigator.geolocation.getCurrentPosition(
      location => {
        const { latitude, longitude } = location.coords;
        fetchData({ latitude, longitude }, temperatureUnits);
      },
      () => setError("Cannot access your location")
    );

    temperatureUnits && setUnits(temperatureUnits);
  }, []);

  useEffect(() => {
    data && fetchData(data.locationInfo.name, units);
  }, [units]);

  useEffect(() => {
    localStorage.setItem("favoriteCities", JSON.stringify(favorites));
  }, [favorites]);

  async function fetchData(location, units) {
    setLoading(true);
    setError(null);

    const locationInfo = await getLocationInfo(location);

    try {
      const { lat, lon } = locationInfo.coord;

      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${openWeatherKey}`
      );

      response = await response.json();

      setData({ ...response, locationInfo, units });
    } catch (error) {
      handleError(String(error));
    } finally {
      setLoading(false);
    }
  }

  async function getLocationInfo(location) {
    const locationQuery =
      typeof location === "string"
        ? `q=${location}`
        : `lat=${location.latitude}&lon=${location.longitude}`;

    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${locationQuery}&appid=${openWeatherKey}`
      );

      response = await response.json();

      if (response.cod === 200) {
        const { name, coord, sys } = response;
        const { country } = sys;

        return { name, coord, country };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      handleError(String(error));
    }
  }

  const handleError = message => {
    setData(null);
    setError(message);
    console.error(message);
  };

  const changeUnits = event => {
    const { value } = event.target;

    localStorage.setItem("temperatureUnits", JSON.stringify(value));
    setUnits(value);
  };

  const validateLocation = value => {
    let errors = [];

    if (value.length > 20) {
      errors.push("Maximum 20 symbols");
    }

    if (value.length && !value.match(/^[a-zA-Z\s]*$/)) {
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
            location.length &&
              !locationErrors.length &&
              fetchData(location, units);
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
        {loading ? (
          <div className={style.loader} />
        ) : error ? (
          <p className={style.error}>{error}</p>
        ) : data ? (
          <>
            <CityInfo
              data={data.locationInfo}
              favorites={favorites}
              setFavorites={setFavorites}
            />

            <div className={style.weatherCards}>
              <WeatherCard
                data={{
                  ...data.current,
                  units: data.units
                }}
              />

              {data.daily.map((dayData, index) => {
                return (
                  <ForecastCard
                    key={index}
                    data={{
                      ...dayData,
                      units: data.units
                    }}
                  />
                );
              })}
            </div>

            <Map
              position={[
                data.locationInfo.coord.lat,
                data.locationInfo.coord.lon
              ]}
            />
          </>
        ) : (
          <p>Search location to see weather data</p>
        )}
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
            fetchData={location => fetchData(location, units)}
          />
        </Section>
      </SideMenu>

      <div
        className={`${style.overlay} ${sideMenuOpen && style.visible}`}
        onClick={() => {
          setSideMenuOpen(false);
        }}
      />
    </>
  );
}

export default App;
