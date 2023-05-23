// https://fullstackopen.com/en/part2/adding_styles_to_react_app#couple-of-important-remarks
// Exercise 2.18, 2.19, 2.20

import { useState, useEffect } from 'react'
import ShowCountries from './components/ShowCountries'
import countriesService from './services/countries'

const App = () =>  {
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAllCountries()
      .then(allCountriesData => {
        setCountries(allCountriesData)
      })
      .catch(error => {
        console.log('Check if the url is correct.')
      })
  }, [])
  
  const handleCountryInput = (event) => {
    const searchCountry = event.target.value.toLowerCase()
    const countryResults = countries.filter(country => 
      country.name.common.toLowerCase().includes(searchCountry)
    )
    setShowCountries(countryResults) 
  }

  return (
    <div>
      <input onChange={handleCountryInput}></input>
      <ShowCountries countriesToShow={showCountries} />
    </div>
  )
}

export default App