import React, { useEffect, useState } from 'react';
const axios = require('axios');
const api_key = process.env.REACT_APP_API_KEY;

const SingleCountry = ({ country }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const params = {
      appid: api_key,
      q: country.capital[0],
      units: 'metric',
    };
    axios
      .get('http://api.openweathermap.org/data/2.5/weather?', { params })
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country]);

  const languages = Object.values(country.languages);

  return (
    <div>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital[0]}</p>
          <p>Population: {country.population}</p>

          <h2>Languages</h2>
          <ul>
            {languages.map((language) => (
              <li>{language}</li>
            ))}
          </ul>
          <img
            src={country.flags[0]}
            alt={`${country.name.common} national flag`}
          />
          <h2>Weather in {country.capital[0]}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>Summary: {weather.weather[0].main}</p>
          <p>Temperature: {Math.floor(weather.main.temp)} Celsius</p>
        </div>
      )}
    </div>
  );
};

export default SingleCountry;