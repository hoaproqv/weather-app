import React, { useState, useEffect } from "react";
import "./App.css";
const app = {
  key: "fd58f74996f0947bad74debcdbb9744a",
  base: "https://api.openweathermap.org/data/2.5/weather",
};
const d = new Date();
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekday[d.getDay()];
const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = monthList[d.getMonth()];

function App() {
  const [getDataInput, setGetDataInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(getDataInput);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!getDataInput) return;
      setLoading(true);
      try {
        const responsive = await fetch(
          `${app.base}?q=${searchCity}&units=metric&appid=${app.key}`,
        );
        const data = await responsive.json();
        console.log(data);
        if (responsive.ok) {
          setWeatherInfo({
            name: data.name,
            country: data.sys.country,
            template: data.main.temp,
            description: data.weather[0].description,
          });
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
        setLoading(false);
      } catch (err) {
        setErrorMessage(err.message);
      }
    };
    fetchWeatherData();
  }, [searchCity]);

  return (
    <div id="weather-card">
      <form onSubmit={handleSubmit}>
        <div id="search">
          <input
            type="text"
            value={getDataInput}
            placeholder="search city"
            onChange={(e) => {
              setGetDataInput(e.target.value);
            }}
          />
          <button type="submit">Search</button>
        </div>
      </form>
      {loading ? (
        <div style={{textAlign: "center", fontSize: "30px", color: "white"}}>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red", textAlign: "center", fontSize: "30px" }}>{errorMessage}</div>
          ) : (
            <>
              {weatherInfo ? (
                <div id="info">
                  <div id="city">
                    <p>{`${weatherInfo.name}, ${weatherInfo.country}`}</p>
                    <p>{`${day} ${d.getDate()} ${month} ${d.getFullYear()}`}</p>
                    <p>{`${Math.floor(weatherInfo.template)}°C`}</p>
                    <p>{`${weatherInfo.description}`}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
