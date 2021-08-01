import React, {useState} from 'react';

const Country = ({country}) => {
  console.log('Country', country)

  if (!country) {
    return(<div/>);
  }

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
    </div>
  )
};

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

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleButtonClick = (country) => {
    return () => setSelectedCountry(country);
  };

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter!
      </div>
    )
  }

  if (countries.length > 1) {
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

  return (
    <div>
      {countries.map(country => <Country country={country} key={country.name} />)}
    </div>
  )
};

export default Countries;