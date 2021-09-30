import React, { useEffect, useState } from 'react';
import SingleCountry from './SingleCountry';

const CountryDisplay = ({ filteredCountries, setFilteredCountries }) => {

  return (
    <div>
      {filteredCountries.length === 1 ? (
        <SingleCountry country={filteredCountries[0]} />
      ) : filteredCountries.length > 10 ? (
        <p>Please enter a search to narrow down your country selection</p>
      ) : (
        filteredCountries.map((country) => {
          return (
            <div>
              <p>{country.name.common}</p>
              <button onClick={() => setFilteredCountries([country])}>
                show
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CountryDisplay;
