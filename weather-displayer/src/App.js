import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL =
  "https://api.openweathermap.org/data/2.5/forecast?q=Waterloo&APPID=17baea28c7ffc010042185e7f77b65a9";

const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

const getPrecipitation = (data) => {
  let amount = 0;
  if (data.rain) amount += data.rain["3h"] || 0;
  if (data.snow) amount += data.snow["3h"] || 0;
  return Math.ceil(amount * 10) / 10;
};

const fetchWeatherData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const HourlyBlock = ({ data }) => {
  const timeHours = new Date(data.dt * 1000).getHours();
  const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="float-column">
      {timeHours <= 12 ? `${timeHours}am` : `${timeHours - 12}pm`}
      <img className="weather-icon-small" src={iconURL} alt="Weather icon" />
      <div className="temperature-text-small">
        {kelvinToCelsius(data.main.temp)}º
      </div>
      Feels {kelvinToCelsius(data.main.feels_like)}º
      <br />
      🌧 {getPrecipitation(data)}mm
    </div>
  );
};

const MainScreen = ({ weatherData, toggleScreen, currentDate, currentTime }) => {
  const currentWeather = weatherData.list[0];
  const iconURL = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

  return (
    <div className="App">
      <div className="current-date">{currentDate}</div>
      <div className="current-time">{currentTime}</div>
      <div className="title">DOORSENSE</div>
      <br />
      <div className="float-container">
        <div className="float-arrow-left">
        </div>
        <div className="float-block-left">
          <img className="weather-icon" src={iconURL} alt="Weather icon" />
          <br />
          <div className="weather-type">{currentWeather.weather[0].main}</div>
        </div>
        <div className="float-block-right">
          <div className="weather-temperature">
            {kelvinToCelsius(currentWeather.main.temp)}º
          </div>
          Feels Like: {kelvinToCelsius(currentWeather.main.feels_like)}º
          <br />
          H: {kelvinToCelsius(currentWeather.main.temp_max)}º &nbsp; L:{" "}
          {kelvinToCelsius(currentWeather.main.temp_min)}º
          <br />
          🌧 {getPrecipitation(currentWeather)}mm
        </div>
        <div className="float-arrow-right" onClick={toggleScreen}>
          <div className="arrow-right"></div>
        </div>
      </div>
    </div>
  );
};

const HourlyWeatherScreen = ({ weatherData, toggleScreen, currentDate, currentTime }) => {
  return (
    <div className="App">
      <div className="current-date">{currentDate}</div>
      <div className="current-time">{currentTime}</div>
      <div className="title">DOORSENSE</div>
      <br />
      <div className="float-container">
        <div className="float-arrow-left" onClick={toggleScreen}>
          <div className="arrow-left"></div>
        </div>
        {weatherData.list.slice(1, 6).map((data, index) => (
          <HourlyBlock key={index} data={data} />
        ))}
        <div className="float-arrow-right">
        </div>
      </div>
    </div>
  );
};

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [onMainScreen, setOnMainScreen] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  const toggleScreen = () => setOnMainScreen((prev) => !prev);

  useEffect(() => {
    const loadWeatherData = async () => {
      const data = await fetchWeatherData();
      if (data) setWeatherData(data);
    };

    loadWeatherData();
    const weatherInterval = setInterval(loadWeatherData, 60000);

    return () => clearInterval(weatherInterval);
  }, []);

  useEffect(() => {
    const dateInterval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(dateInterval);
  }, []);

  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  if (!weatherData) {
    return <div className="App">Loading weather data...</div>;
  }

  return (
    <div>
      {onMainScreen ? (
        <MainScreen
          weatherData={weatherData}
          toggleScreen={toggleScreen}
          currentDate={formattedDate}
          currentTime={formattedTime}
        />
      ) : (
        <HourlyWeatherScreen
          weatherData={weatherData}
          toggleScreen={toggleScreen}
          currentDate={formattedDate}
          currentTime={formattedTime}
        />
      )}
    </div>
  );
}

export default App;
