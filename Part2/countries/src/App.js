import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Countries from "./components/Country"
import Filter from "./components/Filter"

require('dotenv').config();

const App = () => {
  // #region States
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  // #endregion States

  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, []);
  console.log('render', countries.length, 'countries')


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  };

  const countriesToShow = filter === ''
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Country Info</h2 >
      <div>
        Find countries: <Filter filter={filter} onChange={handleFilterChange} />
      </div>
      <br />

      <div>
        <Countries countries={countriesToShow} />
      </div>
    </div>
  )
}

export default App