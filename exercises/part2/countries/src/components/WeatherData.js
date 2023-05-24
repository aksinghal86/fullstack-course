import { useState, useEffect } from "react"
import countriesService from "../services/countries"

const WeatherData = ({ country }) => { 
  const [weather, setWeather] = useState(null)

  useEffect(() => { 
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]

    countriesService
      .getWeather({ lat, lon })   
      .then(data => setWeather(data))
      .catch(error => console.log("Invalid URL or limit of API calls exceeded."))
  }, [country])
  
  if (!weather) return (null)
  return (
    <div>
      <h1>Weather in {country.capital[0]}</h1>
      <div>temperature {weather.current.temp} C</div>
      <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt='weather'/>
      <div>wind {weather.current.wind_speed} m/s</div>
    </div>
  )
}

export default WeatherData