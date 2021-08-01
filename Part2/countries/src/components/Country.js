import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Country = ({country}) => {
  console.log('Country', country)

  const [weather, setWeather] = useState();

  const api_key = process.env.REACT_APP_API_KEY;
  console.log('API key', api_key);

  useEffect(() => {
    console.log('Weather Effect');
    axios
      .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + country.name)
      .then(response => {
        console.log('Weather promise fulfilled')
        setWeather(response.data.current)
      })
  }, []);

  console.log('Weather', weather);

  return (
    <div>
      <h2>
        {country.name}
      </h2>

      <div>
        Capital: {country.capital}
      </div>
      <div>
        Population: {country.population}
      </div>
      <br />

      <h3>
        Languages
      </h3>
      <ul>
        {country.languages.map(language => <Language languageName={language.name} key={language.nativeName} />)}
      </ul>
      <br />

      <img src={country.flag} alt='Flag not found' width='100px' height='60px' />
      <br />

      <Weather cityName={country.capital} weather={weather} />
    </div>
  )
};

const Weather = ({cityName, weather}) => {
  if (!weather) {
    return <div />
  }

  return (
    <div>
      <h3>
        Weather in {cityName}
      </h3>
      <div>
        <b>Temperature:</b> {weather.temperature}
      </div>
      <div>
        <img src={weather.weather_icons} alt='Icon not found' width='60px' height='60px' />
      </div>
      <div>
        <b>Wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}
      </div>
    </div>
  )
}

const Language = ({languageName}) => {
  console.log('Language', languageName)
  return (
    <li key={languageName}>
      {languageName}
    </li>
  )
};

const CountryListEntry = ({country, onClick}) => {
  console.log('CountryListEntry', {onClick});

  return (
    <div>
      {country.name} <button onClick={onClick}> show </button>
    </div>
  )
}

const Countries = ({countries}) => {
  console.log('Countries', countries);

  const [selectedCountry, setSelectedCountry] = useState();

  const handleButtonClick = (country) => {
    return () => setSelectedCountry(country);
  };

  if (countries.length > 10) {
    if (selectedCountry) {
      setSelectedCountry();
    }
    return (
      <div>
        Too many matches, specify another filter!
      </div>
    )
  }

  if (countries.length > 1) {
    if (!selectedCountry) {
      return (
        <div>
          {countries.map(
            country => <CountryListEntry
              country={country}
              onClick={handleButtonClick(country)}
              key={country.name} />
          )}
        </div>
      )
    }

    return (
      <div>
        {countries.map(
          country => <CountryListEntry
            country={country}
            onClick={handleButtonClick(country)}
            key={country.name} />
        )}
        <Country country={selectedCountry} />
      </div>
    )
  }

  if (selectedCountry) {
    setSelectedCountry();
  }
  return (
    <div>
      {countries.map(country => <Country country={country} key={country.name} />)}
    </div>
  )
};

export default Countries;