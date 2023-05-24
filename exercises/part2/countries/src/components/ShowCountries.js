import ShowCountryDetail from './ShowCountryDetail'

const ShowCountries = ({ countries, showCountry }) => {
  // console.log(countries)
  if (countries.length > 10) {
    return <p>Too many matches. Please be more specific</p>
  }

  if (countries.length === 1) { 
    return <ShowCountryDetail country={countries[0]}/>
  }
   
  return (
    <div>
      {countries.map(country => 
        <div key={country.ccn3}>
          {country.name.common}
          <button onClick={() => showCountry(country.name.common)}>show</button>
        </div>
      )}
    </div>
  )
}
  
export default ShowCountries