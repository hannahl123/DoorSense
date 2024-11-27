import React, { useState } from "react";
import "./App.css";

function getWeatherData() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open(
    "GET",
    "https://api.openweathermap.org/data/2.5/forecast?q=Waterloo&APPID=d97086b5aed80cbec2b6844624d90f9d",
    false
  ); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}

function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

function App() {
  let weatherData = getWeatherData();

  const [onScreen1, setOnScreen1] = useState(true);
  const toggleScreen = () => {
    setOnScreen1((prev) => !prev);
  };
  const Screen1 = () => {
    const iconURL =
      "https://openweathermap.org/img/wn/" +
      weatherData["list"][0]["weather"][0]["icon"] +
      "@2x.png";
    return (
      <div className="App">
        <div className="title">DOORSENSE</div>
        <br />
        <div className="float-container">
          <div className="float-arrow-left">
            {/* <div className="arrow-left"></div> */}
          </div>
          <div className="float-block-left">
            <img className="weather-icon" src={iconURL} />
            <br />
            <div className="weather-type">
              {weatherData["list"][0]["weather"][0]["main"]}
            </div>
          </div>
          <div className="float-block-right">
            <div className="weather-temperature">
              {Math.round(
                kelvinToCelsius(weatherData["list"][0]["main"]["temp"])
              )}
              º
            </div>
            <br />
            Feels Like:{" "}
            {Math.round(
              kelvinToCelsius(weatherData["list"][0]["main"]["feels_like"])
            )}
            º
          </div>
          <div className="float-arrow-right">
            <div className="arrow-right" onClick={toggleScreen}></div>
          </div>
        </div>
      </div>
    );
  };
  const HourlyBlock = (index) => {
    const timeHours = new Date(
      weatherData["list"][index]["dt"] * 1000
    ).getHours();
    const iconURL =
      "https://openweathermap.org/img/wn/" +
      weatherData["list"][index]["weather"][0]["icon"] +
      "@2x.png";
    return (
      <div className="float-column">
        {timeHours <= 12 ? timeHours + "am" : timeHours - 12 + "pm"}
        <img className="weather-icon-small" src={iconURL} />
        <div className="temperature-text-small">2º</div>
      </div>
    );
  };
  const Screen2 = () => {
    return (
      <div className="App">
        <div className="title">DOORSENSE</div>
        <br />
        <div className="float-container">
          <div className="float-arrow-left">
            <div className="arrow-left" onClick={toggleScreen}></div>
          </div>
          {HourlyBlock(1)}
          {HourlyBlock(2)}
          {HourlyBlock(3)}
          {HourlyBlock(4)}
          {HourlyBlock(5)}
          <div className="float-arrow-right">
            {/* <div className="arrow-right"></div> */}
          </div>
        </div>
      </div>
    );
  };
  return <div>{onScreen1 ? <Screen1 /> : <Screen2 />}</div>;
}

export default App;
