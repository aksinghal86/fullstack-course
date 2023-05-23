import WeatherData from "./WeatherData"

const ShowCountryDetail = ({ country }) => {
    if (!country) return (null) 
    // console.log(country)
    const languages = Object.values(country.languages)
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital: {country.capital}</div>
        <div>area: {country.area} km2</div>
        <h2>languages:</h2>
        <ul>{languages.map(lang => <li key={lang}>{lang}</li>)}</ul> 
        <img src={country.flags.png} alt='flag'/>
        <WeatherData country={country} />
      </div>
    )
  }

  export default ShowCountryDetail
  