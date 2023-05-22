// https://fullstackopen.com/en/part2/adding_styles_to_react_app#couple-of-important-remarks
// Exercise 2.18, 2.19

import { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountryDetail = ({ country }) => {
  if (!country) return (null)
  const languages = Object.values(country.languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital}</div>
      <div>area: {country.area} km2</div>
      <h2>languages:</h2>
      <ul>{languages.map(lang => <li key={lang}>{lang}</li>)}</ul> 
      <img src={country.flags.png} alt='flag'/>
    </div>
    
  )
}

const ShowCountries = ({ countriesToShow }) => {
  // if (countriesToShow.length === 1) {
  //   return (
  //     <ShowCountryDetail country={countriesToShow[0]} />
  //   )
  // } 
  const [showCountry, setShowCountry] = useState(null)
  
  
  const handleShowCountry = (country) => {
    setShowCountry(country)
  }
  
  if (countriesToShow.length < 10) { 
    return (
      <div>
        {countriesToShow.map(country => 
          <div key={country.ccn3}>
            {country.name.common}
            <button onClick={() => {handleShowCountry(country)}}>show</button>
          </div>
        )}
        <ShowCountryDetail country={showCountry} />
      </div>
    )
  } else {
    return (
      <p>Too many matches. Please be more specific.</p>
    )
  }
}

const App = () =>  {
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
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