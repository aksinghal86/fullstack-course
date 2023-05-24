import axios from 'axios'

const getAllCountries = () => {
    const request = axios.get("https://restcountries.com/v3.1/all")
    return request.then(response => response.data)
}

const getWeather = ({ lat, lon }) => { 
    const baseURL = 'https://api.openweathermap.org'
    const api_key = process.env.REACT_APP_API_KEY
    const units = 'metric'
    const weatherURL = `${baseURL}/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${api_key}`
    const request = axios.get(weatherURL)
    return request.then(response => response.data)
}

const countriesService = { getAllCountries, getWeather }

export default countriesService