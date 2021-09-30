import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CountryDisplay from './components/CountryDisplay';

const apiEndpoint = 'https://restcountries.com/v3/all';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState({});

  useEffect(() => {
    axios
      .get(apiEndpoint)
      .then((response) => {
        setCountries(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [search, countries]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <p>Find countries: </p>
      <input value={search} onChange={handleSearchChange} />
      <h3>Country Details</h3>
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <CountryDisplay
          filteredCountries={filteredCountries}
          setFilteredCountries={setFilteredCountries}
        />
      )}
    </div>
  );
}

export default App;
