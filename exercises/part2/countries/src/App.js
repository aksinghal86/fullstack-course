// https://fullstackopen.com/en/part2/adding_styles_to_react_app#couple-of-important-remarks
// Exercise 2.18, 2.19, 2.20

import { useState, useEffect } from 'react'
import ShowCountries from './components/ShowCountries'
import countriesService from './services/countries'

const App = () =>  {
  const [search, setSearch] = useState('fi')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAllCountries()
      .then(data => setCountries(data))
      .catch(() => console.log('Check if the url is correct.'))
  }, [])

  const countryResults = countries.filter(c => c.name.common.toLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <div>
      <div>
        find country 
        <input value={search} onChange={({ target }) => setSearch(target.value)} />
      </div>
      <ShowCountries countries={countryResults} showCountry={setSearch} />
    </div>
  )
}

export default App