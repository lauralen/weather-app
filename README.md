# Weather App

## About

React web app application that displays current weather information using OpenWeatherMap API.

### Features

- Search by city name
- Show weather by current device location
- Display selected weather layers (clouds, wind speed, etc.) on a map
- Save favorite cities

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Installing

Clone the repository

```
git clone https://github.com/lauralen/weather-app.git
```

Install dependencies

```
npm install
```

Get OpenWeatherMap API access key

- Register at https://openweathermap.org/ to get API access key
- Create a openWeatherKey.js file in utils folder.
- Copy the following code and replace YOUR_ACCESS_KEY with your API access key.

```
const openWeatherKey = 'YOUR_ACCESS_KEY';

export default openWeatherKey;
```

Start development server

```
npm start
```

## Demo

The project is live at https://react-weather-check-app.herokuapp.com/
