import axios from 'axios'

const getAllCountries = () => {
    const request = axios.get("https://restcountries.com/v3.1/all")
    return request.then(response => response.data)
}

const baseURL = 'https://api.openweathermap.org'
const api_key = process.env.REACT_APP_API_KEY

const getCapitalCoords = country => { 
    console.log('getting coords...')
    const countryCode = country.cca2
    const capital = country.capital[0]
    const geoCodeURL = `${baseURL}/geo/1.0/direct?q=${capital},${countryCode}&limit=1&appid=${api_key}`
    console.log(geoCodeURL)
    const request = axios.get(geoCodeURL)
    return request.then(response => response.data[0])
}

const getCityWeather = city => { 
    console.log('fetching weather data...')
    const lat = city.lat
    const lon = city.lon
    const units = 'metric'
    const weatherURL = `${baseURL}/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${api_key}`
    console.log(weatherURL)
    const request = axios.get(weatherURL)
    return request.then(response => response.data)
}

const countriesService = { getAllCountries, getCapitalCoords, getCityWeather }

export default countriesService