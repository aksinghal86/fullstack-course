import { useState, useEffect } from "react"
import countriesService from "../services/countries"

const WeatherData = ({ country }) => { 
  const [cityCoords, setCityCoords] = useState(null)
  const [cityWeather, setCityWeather] = useState(null)

  useEffect(() => {
    if (country) {
      countriesService
        .getCapitalCoords(country)
        .then(coords => {
          setCityCoords(coords)
        })
        .catch(error => console.log('Invalid url or limit of API calls exceeded')) 
    }
  }, [country])

  useEffect(() => { 
    if (cityCoords) {
      countriesService
      .getCityWeather(cityCoords)   
      .then(weather => setCityWeather(weather))
      .catch(error => console.log("Invalid URL or limit of API calls exceeded."))
    }    
  }, [cityCoords])
  
  if (!cityWeather) return (null)
  return (
    <div>
      <h1>Weather in {country.capital[0]}</h1>
      <div>temperature {cityWeather.current.temp} C</div>
      <img src={`https://openweathermap.org/img/wn/${cityWeather.current.weather[0].icon}@2x.png`} alt='weather'/>
      <div>wind {cityWeather.current.wind_speed} m/s</div>
    </div>
  )
}

export default WeatherData