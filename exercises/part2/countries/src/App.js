// https://fullstackopen.com/en/part2/adding_styles_to_react_app#couple-of-important-remarks
// Exercise 2.18, 2.19, 2.20

import { useState, useEffect } from 'react'
import axios from 'axios'

const GetWeatherData = ({ country }) => { 
  const [countryWeather, setCountryWeather] = useState(null)
  
  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    const baseURL = 'https://api.openweathermap.org/data/3.0/onecall'
    const lat = country.latlng[0]
    const lon = country.latlng[1]
    const units = 'metric'
    const weatherURL = `${baseURL}?lat=${lat}&lon=${lon}&units=${units}&appid=${api_key}`
    
    axios
      .get(weatherURL)
      .then(response => setCountryWeather(response.data))
      .catch(error => {
        console.log("Invalid URL")
      })

  }, [country])
  
  if (!countryWeather) return(null)

  return (
    <div>
      <h1>Weather in {country.name.common}</h1>
      <div>temperature {countryWeather.current.temp} C</div>
      <img src={`https://openweathermap.org/img/wn/${countryWeather.current.weather[0].icon}@2x.png`} alt='weather'/>
      <div>wind {countryWeather.current.wind_speed} m/s</div>
    </div>
  )
}

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
      <GetWeatherData country={country} />
    </div>
  )
}

const ShowCountries = ({ countriesToShow }) => {
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